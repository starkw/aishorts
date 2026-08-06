"""模板样图流水线：把生成好的图压缩入库，并写回 templates.ts 的 image 字段。

生成器把图存成 <ASSETS>/t-<模板id>.png，本脚本负责后续三件事：
  1. 缩到 720px 长边、转渐进式 JPEG，控制首页总体积
  2. 落到 public/tpl/t/<模板id>.jpg
  3. 给 templates.ts 里对应模板补上 image 字段（已有则跳过）

用法：
  python3 scripts/tpl-images.py            # 入库 + 写字段
  python3 scripts/tpl-images.py --report   # 只看进度，不改动
"""

import os
import re
import sys
import glob

ASSETS = os.path.expanduser(
    "~/.cursor/projects/Users-wuwenjun-Desktop-AIshorts/assets"
)
OUT_DIR = "public/tpl/t"
DATA = "data/templates.ts"
# 瀑布流最宽一列约 270px，2x 屏幕 540px 就够，640 留一点余量
MAX_EDGE = 640
QUALITY = 78


def template_ids():
    """按文件顺序返回 (id, 是否已配专属图)。分类共用图不算专属。"""
    src = open(DATA).read()
    out = []
    for m in re.finditer(r'\{\s*\n\s*id: "([^"]+)",(.*?)\n  \}', src, re.S):
        out.append((m.group(1), f'image: "/tpl/t/{m.group(1)}.jpg"' in m.group(2)))
    return out


def ingest():
    from PIL import Image

    os.makedirs(OUT_DIR, exist_ok=True)
    known = {tid for tid, _ in template_ids()}
    done, skipped = [], []

    for png in sorted(glob.glob(os.path.join(ASSETS, "t-*.png"))):
        tid = os.path.basename(png)[2:-4]
        if tid not in known:
            skipped.append(tid)
            continue
        dst = os.path.join(OUT_DIR, f"{tid}.jpg")
        im = Image.open(png).convert("RGB")
        im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        im.save(dst, "JPEG", quality=QUALITY, optimize=True, progressive=True)
        done.append((tid, os.path.getsize(dst)))

    return done, skipped


def write_fields(ids):
    """把模板的 image 字段指到自己的样图：没有就插入，指向分类共用图就改写。"""
    src = open(DATA).read()
    added = 0
    for tid in ids:
        want = f'image: "/tpl/t/{tid}.jpg",'
        block = re.compile(
            r'(id: "' + re.escape(tid) + r'",.*?ratio: "[^"]+",\n)', re.S
        )
        m = block.search(src)
        if not m:
            continue
        # image 字段紧跟在 ratio 行后面
        rest = src[m.end(1) :]
        old = re.match(r'\s*image: "[^"]+",\n', rest)
        if old:
            if old.group(0).strip() == want:
                continue
            rest = rest[old.end() :]
        src = src[: m.end(1)] + f"    {want}\n" + rest
        added += 1
    open(DATA, "w").write(src)
    return added


def report():
    rows = template_ids()
    have = sum(1 for _, ok in rows if ok)
    print(f"配图进度 {have}/{len(rows)}")
    missing = [tid for tid, ok in rows if not ok]
    if missing:
        print(f"待配 {len(missing)} 个：")
        print("  " + " ".join(missing))


if __name__ == "__main__":
    if "--report" in sys.argv:
        report()
        sys.exit(0)

    ingested, unknown = ingest()
    added = write_fields([tid for tid, _ in ingested])
    total_kb = sum(sz for _, sz in ingested) // 1024
    print(f"入库 {len(ingested)} 张，合计 {total_kb}KB，写入 {added} 个 image 字段")
    if unknown:
        print(f"忽略非模板文件：{', '.join(unknown)}")
    report()
