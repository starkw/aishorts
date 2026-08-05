"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Search } from "lucide-react";
import {
  CATEGORY_GRADIENT,
  TEMPLATE_CATEGORIES,
  templateImage,
  templates,
  type Template,
  type TemplateCategory,
} from "@/data/templates";

type Filter = TemplateCategory | "全部";

/** 分类轮转排列。模板本身按分类分组，而 CSS 多列是逐列填充的，
 *  直接铺会让同类卡片在一列里连续堆叠，样图看起来一直在重复。 */
function interleaveByCategory(list: Template[]) {
  const queues = new Map<TemplateCategory, Template[]>();
  for (const t of list) {
    const q = queues.get(t.category);
    if (q) q.push(t);
    else queues.set(t.category, [t]);
  }
  const pending = [...queues.values()];
  const out: Template[] = [];
  while (pending.length) {
    for (let i = 0; i < pending.length; ) {
      out.push(pending[i].shift()!);
      if (pending[i].length === 0) pending.splice(i, 1);
      else i++;
    }
  }
  return out;
}

/** 同分类多张卡片共用一张样图，靠取景位移错开，避免看起来重复 */
const OBJECT_POSITIONS = [
  "object-center",
  "object-top",
  "object-bottom",
  "object-left",
  "object-right",
];

/** 让瀑布流有高低错落，循环一组互质长度的高度，避免同列出现规律 */
const HEIGHTS = ["h-44", "h-64", "h-52", "h-80", "h-48", "h-72", "h-56", "h-60"];

export default function TemplateShowcase() {
  const [filter, setFilter] = useState<Filter>("全部");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["全部", templates.length]]);
    TEMPLATE_CATEGORIES.forEach((c) =>
      map.set(c, templates.filter((t) => t.category === c).length)
    );
    return map;
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = templates.filter((t) => {
      const matchCat = filter === "全部" || t.category === filter;
      const matchQ =
        q === "" ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.prompt.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
    return interleaveByCategory(matched);
  }, [filter, query]);

  const copy = (id: string, prompt: string) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section id="templates" className="bg-[#faf8f4] border-y border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          AI 出图能做什么
        </h2>
        <p className="text-sm text-gray-500 mt-3 mb-7">
          真实的提示词，真实的输出。鼠标悬停任意用例即可复制它的提示词。
        </p>

        {/* 搜索 + 分类 */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-7">
          <div className="relative lg:w-[340px] shrink-0">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索用例……"
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#f1ebe0] text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto no-scrollbar lg:justify-end lg:flex-1">
            {(["全部", ...TEMPLATE_CATEGORIES] as Filter[]).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filter === c
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-black/5"
                }`}
              >
                {c}
                <span className={`ml-1.5 ${filter === c ? "text-white/45" : "text-gray-400"}`}>
                  {counts.get(c)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 瀑布流 */}
        <div className="masonry">
          {visible.map((t, i) => (
            <div key={t.id} className="group relative rounded-2xl overflow-hidden">
              <div
                className={`relative ${HEIGHTS[i % HEIGHTS.length]} bg-gradient-to-br ${
                  CATEGORY_GRADIENT[t.category]
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={templateImage(t)}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover ${
                    OBJECT_POSITIONS[i % OBJECT_POSITIONS.length]
                  } transition-transform duration-500 group-hover:scale-105`}
                />
                {/* 底部压暗，保证标题可读 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" />

                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-medium text-gray-800">
                  {t.category}
                </span>

                <h3 className="absolute inset-x-3 bottom-3 text-sm font-bold text-white drop-shadow">
                  {t.name}
                </h3>

                {/* 悬停操作层 */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center gap-2 p-3">
                  <p className="text-[10px] text-white/70 line-clamp-4 leading-relaxed font-mono">
                    {t.prompt}
                  </p>
                  <div className="flex gap-1.5">
                    <a
                      href={`/?template=${t.id}#generator`}
                      className="flex-1 text-center py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-gray-900 text-[11px] font-bold transition-colors"
                    >
                      用这个
                    </a>
                    <button
                      onClick={() => copy(t.id, t.prompt)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors"
                      aria-label="复制提示词"
                    >
                      {copied === t.id ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-16">
            没有匹配的模板，换个关键词试试
          </p>
        )}
      </div>
    </section>
  );
}
