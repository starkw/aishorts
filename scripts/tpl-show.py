"""按 id 打印模板信息，方便对着 prompt 生成样图。

用法：python3 scripts/tpl-show.py id1 id2 ...
不带参数时打印所有还没配图的模板。
"""

import re
import sys

DATA = "data/templates.ts"

FIELDS = ("name", "description", "mode", "ratio", "prompt")


def blocks():
    src = open(DATA).read()
    for m in re.finditer(r'\{\s*\n\s*id: "([^"]+)",(.*?)\n  \}', src, re.S):
        body = m.group(2)
        row = {"id": m.group(1), "has_image": "image:" in body}
        for f in FIELDS:
            hit = re.search(f + r':\s*"((?:[^"\\]|\\.)*)"', body)
            row[f] = hit.group(1) if hit else ""
        yield row


if __name__ == "__main__":
    want = set(sys.argv[1:])
    for row in blocks():
        if want and row["id"] not in want:
            continue
        if not want and row["has_image"]:
            continue
        print(f'### {row["id"]} | {row["name"]} | {row["mode"]} | {row["ratio"]}')
        print(f'  desc: {row["description"]}')
        print(f'  prompt: {row["prompt"]}\n')
