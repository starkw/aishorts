"""生成社交分享预览图 public/og-image.jpg（1200x630）。

复用首屏那张背景图和已经栅格化好的品牌标识，压一层与首屏同向的
暗色渐变（左重右轻）保证文字可读，再排上标题与副标题。

文案与首屏保持一致，改了首屏记得重跑：python3 scripts/build-og.py
"""

import os

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
PAD = 80
BG = "public/bg/hero.jpg"
MARK = "public/logo-mark-512.png"
OUT = "public/og-image.jpg"

GOLD = (245, 158, 11)
FONT = "/System/Library/Fonts/PingFang.ttc"
SEMIBOLD, MEDIUM = 8, 5  # PingFang SC 的字重索引

BRAND = "AI Shorts"
TITLE = "免费 AI 图像生成器"
SUB = "无需 ChatGPT。无需注册。无需信用卡。"
FOOT = "aishorts.top"


def font(size, weight=SEMIBOLD):
    return ImageFont.truetype(FONT, size, index=weight)


def cover(img, w, h):
    """等比缩放后居中裁剪，填满目标尺寸不变形。"""
    k = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * k), round(img.height * k)), Image.LANCZOS)
    return img.crop((
        (img.width - w) // 2,
        (img.height - h) // 2,
        (img.width - w) // 2 + w,
        (img.height - h) // 2 + h,
    ))


def scrim(w, h):
    """左重右轻的横向渐变，叠一层整体压暗。"""
    grad = Image.new("L", (w, 1))
    px = grad.load()
    for x in range(w):
        t = x / (w - 1)
        px[x, 0] = round(235 - 150 * t)  # 左 235 → 右 85
    grad = grad.resize((w, h))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 255))
    layer.putalpha(grad)
    return layer


def build():
    base = cover(Image.open(BG).convert("RGB"), W, H).convert("RGBA")
    base.alpha_composite(scrim(W, H))
    d = ImageDraw.Draw(base)

    # 品牌行：标识 + 名称
    mark_px = 46
    mark = Image.open(MARK).convert("RGBA").resize((mark_px, mark_px), Image.LANCZOS)
    base.alpha_composite(mark, (PAD, PAD - 4))
    d.text((PAD + mark_px + 12, PAD + 3), BRAND, font=font(32), fill=(255, 255, 255))

    d.text((PAD, 206), TITLE, font=font(92), fill=(255, 255, 255))
    d.text((PAD, 342), SUB, font=font(40, MEDIUM), fill=(255, 255, 255, 225))

    # 底部：金色短横 + 域名
    y = H - PAD - 14
    d.rounded_rectangle([PAD, y, PAD + 56, y + 5], radius=3, fill=GOLD)
    d.text((PAD + 76, y - 13), FOOT, font=font(30, MEDIUM), fill=GOLD)

    # 底图是照片，JPEG 比 PNG 小一个数量级（88KB vs 515KB）
    base.convert("RGB").save(OUT, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"{OUT}  {W}x{H}  {os.path.getsize(OUT) // 1024}KB")


if __name__ == "__main__":
    build()
