"""生成品牌标识：圆 + 三角的几何抽象（日与山），输出 SVG 与各尺寸 PNG。

三角在前遮住圆，两者之间留一条宽度处处相等的负空间缝。
做法是把三角以内心为中心等比放大——内心到三条边距离相等，
放大后每条边外扩同一距离——再用它从圆里挖掉，缝宽因此恒定
且完全贴合三角的边，两个形状的关系是算出来的而非摆出来的。
"""

import math
import os

VIEW = 64.0

TRI = [(36.5, 15.0), (54.5, 50.0), (9.5, 50.0)]    # 顶点、右下、左下
CIRCLE = (20.0, 24.0, 10.5)                        # 圆心 x, y, 半径
GAP = 3.0                                          # 负空间缝宽
GOLD = "#F59E0B"                                   # amber-500


def f(v):
    return f"{v:.2f}"


def incenter(tri):
    """内心：三边长为权重的顶点加权平均。"""
    a = math.dist(tri[1], tri[2])
    b = math.dist(tri[2], tri[0])
    c = math.dist(tri[0], tri[1])
    s = a + b + c
    return ((a * tri[0][0] + b * tri[1][0] + c * tri[2][0]) / s,
            (a * tri[0][1] + b * tri[1][1] + c * tri[2][1]) / s)


def inradius(tri, ic):
    """内心到任一条边的距离。"""
    p, q = tri[0], tri[1]
    return (abs((q[0] - p[0]) * (p[1] - ic[1]) - (p[0] - ic[0]) * (q[1] - p[1]))
            / math.dist(p, q))


def expand(tri, d):
    """每条边向外平移 d：以内心为中心按 1 + d/内切圆半径 缩放。"""
    ic = incenter(tri)
    k = 1.0 + d / inradius(tri, ic)
    return [(ic[0] + (x - ic[0]) * k, ic[1] + (y - ic[1]) * k) for x, y in tri]


def poly(pts):
    return "M" + "L".join(f"{f(x)} {f(y)}" for x, y in pts) + "Z"


def svg():
    cx, cy, r = CIRCLE
    cut = expand(TRI, GAP)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VIEW:.0f} {VIEW:.0f}" '
        f'fill="{GOLD}">'
        f'<mask id="m">'
        f'<rect width="{VIEW:.0f}" height="{VIEW:.0f}" fill="#fff"/>'
        f'<path d="{poly(cut)}" fill="#000"/>'
        f'</mask>'
        f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" mask="url(#m)"/>'
        f'<path d="{poly(TRI)}"/>'
        f'</svg>\n'
    )


def png(sizes):
    from PIL import Image, ImageDraw

    ss = 8
    n = int(VIEW * ss)
    S = lambda pts: [(x * ss, y * ss) for x, y in pts]
    cx, cy, r = CIRCLE

    mask = Image.new("L", (n, n), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse([(cx - r) * ss, (cy - r) * ss, (cx + r) * ss, (cy + r) * ss], fill=255)
    d.polygon(S(expand(TRI, GAP)), fill=0)      # 挖出均匀缝
    d.polygon(S(TRI), fill=255)                 # 三角本体补回

    rgb = tuple(int(GOLD[i:i + 2], 16) for i in (1, 3, 5))
    big = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    big.paste(Image.new("RGBA", (n, n), rgb + (255,)), (0, 0), mask)

    for s in sizes:
        img = big.resize((s, s), Image.LANCZOS)
        path = "public/favicon.png" if s == 64 else f"public/logo-mark-{s}.png"
        img.save(path)
        print(f"  {path}  {s}x{s}  {max(os.path.getsize(path) // 1024, 1)}KB")


if __name__ == "__main__":
    content = svg()
    for p in ("public/logo-mark.svg", "app/icon.svg"):
        with open(p, "w") as fh:
            fh.write(content)
        print(f"  {p}  {os.path.getsize(p)}B")
    png([64, 180, 512])
