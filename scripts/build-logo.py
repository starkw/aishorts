"""生成品牌标识：单色金的光谱星芒，输出 SVG 与各尺寸 PNG 图标。

造型 = 12 根锥形射线（6 长 6 短交替，构成六重对称）+ 中心圆点。
射线根部与圆点之间留一圈负空间，单色扁平不用渐变，
质感靠形状精度和留白，小尺寸下也不糊。
"""

import math
import os

VIEW = 64.0
C = VIEW / 2

N_RAYS = 12
HALF_ANGLE = 13.0     # 每根射线的半角，越大越敦实
R_LONG = 28.0
R_SHORT = 18.5
R_BASE = 8.5          # 射线根部半径
R_CORE = 5.0          # 中心圆点半径，与根部之间留 3.5 的负空间
GOLD = "#F59E0B"      # amber-500，与站点字标同色系


def pt(r, deg):
    a = math.radians(deg)
    return (C + r * math.cos(a), C + r * math.sin(a))


def rays():
    """返回每根射线的三个顶点：尖端 + 两个根部点。"""
    out = []
    step = 360.0 / N_RAYS
    for i in range(N_RAYS):
        th = -90.0 + i * step
        tip = pt(R_LONG if i % 2 == 0 else R_SHORT, th)
        b1 = pt(R_BASE, th - HALF_ANGLE)
        b2 = pt(R_BASE, th + HALF_ANGLE)
        out.append((tip, b2, b1))
    return out


def svg():
    f = lambda v: f"{v:.2f}"
    parts = []
    for tri in rays():
        d = "M" + "L".join(f"{f(x)} {f(y)}" for x, y in tri) + "Z"
        parts.append(f'<path d="{d}"/>')
    parts.append(f'<circle cx="{f(C)}" cy="{f(C)}" r="{f(R_CORE)}"/>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VIEW:.0f} {VIEW:.0f}" '
            f'fill="{GOLD}">{"".join(parts)}</svg>\n')


def png(sizes):
    from PIL import Image, ImageDraw

    ss = 8
    n = int(VIEW * ss)
    mask = Image.new("L", (n, n), 0)
    d = ImageDraw.Draw(mask)
    for tri in rays():
        d.polygon([(x * ss, y * ss) for x, y in tri], fill=255)
    r = R_CORE * ss
    d.ellipse([C * ss - r, C * ss - r, C * ss + r, C * ss + r], fill=255)

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
