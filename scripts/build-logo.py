"""生成光圈 logo：先按光圈叶片的几何算出路径，再输出 SVG 与 PNG 图标。

叶片形状 = 外侧圆弧 + 两条弦边。弦边向叶片内侧偏移半个缝宽形成间隙，
外弧半径保持不变，所以整体轮廓仍是正圆。
"""

import math
import os

VIEW = 64.0
C = VIEW / 2
R = 27.0
SPAN = 135.0          # 弦跨过的圆心角，越大中心开口越小
GAP = 2.1             # 叶片间缝宽
DARK_BLADE = 5        # 取右上那片压深色

GRAD_FROM = (251, 191, 36)    # amber-400
GRAD_TO = (249, 115, 22)      # orange-500
DARK = (31, 41, 55)           # gray-800


def pt(deg):
    a = math.radians(deg)
    return (C + R * math.cos(a), C + R * math.sin(a))


def chord(k):
    """第 k 条弦，从 k*60 度跨到 k*60+SPAN 度。"""
    a = k * 60.0
    return pt(a), pt(a + SPAN)


def line_from(p, q):
    """两点式转 ax+by=c。"""
    a = q[1] - p[1]
    b = p[0] - q[0]
    return a, b, a * p[0] + b * p[1]


def offset_line(ln, toward, dist):
    """把直线朝 toward 点所在一侧平移 dist。"""
    a, b, c = ln
    n = math.hypot(a, b)
    side = 1.0 if (a * toward[0] + b * toward[1] - c) > 0 else -1.0
    return a, b, c + side * dist * n


def intersect(l1, l2):
    a1, b1, c1 = l1
    a2, b2, c2 = l2
    det = a1 * b2 - a2 * b1
    return ((c1 * b2 - c2 * b1) / det, (a1 * c2 - a2 * c1) / det)


def line_circle(ln, near):
    """直线与外圆的交点，取靠近 near 的那个。"""
    a, b, c = ln
    n2 = a * a + b * b
    # 圆心到直线的垂足
    t = (c - a * C - b * C) / n2
    fx, fy = C + a * t, C + b * t
    h2 = R * R - ((fx - C) ** 2 + (fy - C) ** 2)
    h = math.sqrt(max(h2, 0.0)) / math.sqrt(n2)
    d = (-b * h, a * h)
    cands = [(fx + d[0], fy + d[1]), (fx - d[0], fy - d[1])]
    return min(cands, key=lambda p: (p[0] - near[0]) ** 2 + (p[1] - near[1]) ** 2)


def blade(k):
    """返回 (外弧起点, 外弧终点, 内角点)。"""
    p_in, p_out = chord(k)
    q_in, q_out = chord(k + 1)
    l_k = line_from(p_in, p_out)
    l_k1 = line_from(q_in, q_out)
    raw_inner = intersect(l_k, l_k1)

    # 叶片重心，用来判断“内侧”是哪一边
    mid_arc = pt(k * 60.0 + 30.0)
    g = ((p_in[0] + q_in[0] + raw_inner[0] + mid_arc[0]) / 4,
         (p_in[1] + q_in[1] + raw_inner[1] + mid_arc[1]) / 4)

    o_k = offset_line(l_k, g, GAP / 2)
    o_k1 = offset_line(l_k1, g, GAP / 2)
    return line_circle(o_k, p_in), line_circle(o_k1, q_in), intersect(o_k, o_k1)


def path_of(k):
    start, end, inner = blade(k)
    f = lambda v: f"{v:.2f}"
    return (f"M{f(start[0])} {f(start[1])}"
            f"A{f(R)} {f(R)} 0 0 1 {f(end[0])} {f(end[1])}"
            f"L{f(inner[0])} {f(inner[1])}Z")


def svg():
    paths = []
    for k in range(6):
        fill = "#1F2937" if k == DARK_BLADE else "url(#g)"
        paths.append(f'  <path d="{path_of(k)}" fill="{fill}"/>')
    body = "\n".join(paths)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VIEW:.0f} {VIEW:.0f}">\n'
        f'  <defs>\n'
        f'    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">\n'
        f'      <stop offset="0" stop-color="#{GRAD_FROM[0]:02X}{GRAD_FROM[1]:02X}{GRAD_FROM[2]:02X}"/>\n'
        f'      <stop offset="1" stop-color="#{GRAD_TO[0]:02X}{GRAD_TO[1]:02X}{GRAD_TO[2]:02X}"/>\n'
        f'    </linearGradient>\n'
        f'  </defs>\n'
        f'{body}\n'
        f'</svg>\n'
    )


def polygons(scale, arc_steps=48):
    """把叶片离散成多边形，供 PIL 光栅化用。"""
    out = []
    for k in range(6):
        start, end, inner = blade(k)
        a0 = math.degrees(math.atan2(start[1] - C, start[0] - C))
        a1 = math.degrees(math.atan2(end[1] - C, end[0] - C))
        while a1 < a0:
            a1 += 360.0
        pts = []
        for i in range(arc_steps + 1):
            a = math.radians(a0 + (a1 - a0) * i / arc_steps)
            pts.append(((C + R * math.cos(a)) * scale, (C + R * math.sin(a)) * scale))
        pts.append((inner[0] * scale, inner[1] * scale))
        out.append(pts)
    return out


def png(sizes):
    from PIL import Image, ImageDraw

    ss = 8  # 超采样倍数，换取平滑边缘
    n = int(VIEW * ss)
    polys = polygons(ss)

    grad = Image.new("RGB", (n, n))
    gd = ImageDraw.Draw(grad)
    for i in range(2 * n):
        t = i / (2 * n - 1)
        col = tuple(round(GRAD_FROM[j] + (GRAD_TO[j] - GRAD_FROM[j]) * t) for j in range(3))
        gd.line([(i, 0), (0, i)], fill=col)

    mask_g = Image.new("L", (n, n), 0)
    mask_d = Image.new("L", (n, n), 0)
    for k, p in enumerate(polys):
        ImageDraw.Draw(mask_d if k == DARK_BLADE else mask_g).polygon(p, fill=255)

    big = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    big.paste(grad.convert("RGBA"), (0, 0), mask_g)
    big.paste(Image.new("RGBA", (n, n), DARK + (255,)), (0, 0), mask_d)

    for s in sizes:
        img = big.resize((s, s), Image.LANCZOS)
        path = f"public/favicon.png" if s == 64 else f"public/logo-aperture-{s}.png"
        img.save(path)
        print(f"  {path}  {s}x{s}  {os.path.getsize(path) // 1024 or 1}KB")


if __name__ == "__main__":
    content = svg()
    for p in ("public/logo-aperture.svg", "app/icon.svg"):
        with open(p, "w") as f:
            f.write(content)
        print(f"  {p}  {os.path.getsize(p)}B")
    png([64, 180, 512])
