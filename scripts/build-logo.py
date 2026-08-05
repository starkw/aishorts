"""生成品牌标识：圆角色块 + 白色字母 A，输出 SVG 与各尺寸 PNG 图标。

字母用轮廓多边形定义而不是描边，SVG 与 PNG 共用同一套坐标，
两边渲染一致。外三角挖去内三角得到 Λ 形双腿，横杠是一个梯形，
两端分别贴合左右腿的内边缘，插入后无缝合并。
"""

import math
import os

VIEW = 64.0
RADIUS = 14.0                      # 色块圆角

APEX = (32.0, 13.5)                # 字母外顶点
BASE_Y = 50.5                      # 字母基线
OUT_L, OUT_R = 15.5, 48.5          # 外轮廓底部两角
IN_APEX_Y = 26.0                   # 内三角顶点，决定顶部厚度
IN_L, IN_R = 22.5, 41.5            # 内三角底部两角，决定腿的厚度
BAR_TOP, BAR_BOT = 37.6, 43.2      # 横杠上下沿

GRAD_FROM = "#FBBF24"              # amber-400
GRAD_TO = "#EA580C"                # orange-600


def f(v):
    return f"{v:.2f}"


def poly(pts):
    return "M" + "L".join(f"{f(x)} {f(y)}" for x, y in pts) + "Z"


def outer():
    return [APEX, (OUT_R, BASE_Y), (OUT_L, BASE_Y)]


def inner():
    return [(32.0, IN_APEX_Y), (IN_R, BASE_Y), (IN_L, BASE_Y)]


def inner_edge_x(y, left):
    """内三角某一高度上的左右边缘横坐标，用来对齐横杠两端。"""
    end = IN_L if left else IN_R
    t = (y - IN_APEX_Y) / (BASE_Y - IN_APEX_Y)
    return 32.0 + (end - 32.0) * t


def crossbar():
    return [
        (inner_edge_x(BAR_TOP, True), BAR_TOP),
        (inner_edge_x(BAR_TOP, False), BAR_TOP),
        (inner_edge_x(BAR_BOT, False), BAR_BOT),
        (inner_edge_x(BAR_BOT, True), BAR_BOT),
    ]


def svg():
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VIEW:.0f} {VIEW:.0f}">'
        f'<defs><linearGradient id="t" x1="0" y1="0" x2="1" y2="1">'
        f'<stop offset="0" stop-color="{GRAD_FROM}"/>'
        f'<stop offset="1" stop-color="{GRAD_TO}"/>'
        f'</linearGradient></defs>'
        f'<rect width="{VIEW:.0f}" height="{VIEW:.0f}" rx="{f(RADIUS)}" fill="url(#t)"/>'
        f'<path d="{poly(outer())}{poly(inner())}" fill="#fff" fill-rule="evenodd"/>'
        f'<path d="{poly(crossbar())}" fill="#fff"/>'
        f'</svg>\n'
    )


def png(sizes):
    from PIL import Image, ImageDraw

    ss = 8
    n = int(VIEW * ss)
    S = lambda pts: [(x * ss, y * ss) for x, y in pts]

    # 渐变底 + 圆角裁切
    grad = Image.new("RGB", (n, n))
    gd = ImageDraw.Draw(grad)
    c0 = tuple(int(GRAD_FROM[i:i + 2], 16) for i in (1, 3, 5))
    c1 = tuple(int(GRAD_TO[i:i + 2], 16) for i in (1, 3, 5))
    for i in range(2 * n):
        t = i / (2 * n - 1)
        gd.line([(i, 0), (0, i)],
                fill=tuple(round(c0[j] + (c1[j] - c0[j]) * t) for j in range(3)))

    tile = Image.new("L", (n, n), 0)
    ImageDraw.Draw(tile).rounded_rectangle([0, 0, n - 1, n - 1],
                                           radius=RADIUS * ss, fill=255)

    # 字母遮罩：外三角填充，内三角挖空，横杠补回
    letter = Image.new("L", (n, n), 0)
    ld = ImageDraw.Draw(letter)
    ld.polygon(S(outer()), fill=255)
    ld.polygon(S(inner()), fill=0)
    ld.polygon(S(crossbar()), fill=255)

    big = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    big.paste(grad.convert("RGBA"), (0, 0), tile)
    big.paste(Image.new("RGBA", (n, n), (255, 255, 255, 255)), (0, 0), letter)

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
