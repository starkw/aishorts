"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Search } from "lucide-react";
import {
  CATEGORY_GRADIENT,
  CATEGORY_IMAGE,
  TEMPLATE_CATEGORIES,
  templates,
  type TemplateCategory,
} from "@/data/templates";

type Filter = TemplateCategory | "全部";

/** 同分类多张卡片共用一张样图，靠取景位移错开，避免看起来重复 */
const OBJECT_POSITIONS = ["object-center", "object-top", "object-bottom"];

/** 让瀑布流有高低错落，按序号循环三种高度 */
const HEIGHTS = ["h-44", "h-60", "h-52", "h-72", "h-48", "h-64"];

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
    return templates.filter((t) => {
      const matchCat = filter === "全部" || t.category === filter;
      const matchQ =
        q === "" ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.prompt.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [filter, query]);

  const copy = (id: string, prompt: string) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section id="templates" className="bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-3">
          AI 出图能做什么
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          {templates.length} 个调好的模板，鼠标悬停可复制提示词，点击直接填进生成器
        </p>

        {/* 搜索 + 分类 */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative sm:w-64 shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索模板…"
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {(["全部", ...TEMPLATE_CATEGORIES] as Filter[]).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  filter === c
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {c}
                <span className={`ml-1.5 ${filter === c ? "text-white/50" : "text-gray-400"}`}>
                  {counts.get(c)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 瀑布流 */}
        <div className="masonry">
          {visible.map((t, i) => (
            <div key={t.id} className="group relative rounded-xl overflow-hidden">
              <div
                className={`relative ${HEIGHTS[i % HEIGHTS.length]} bg-gradient-to-br ${
                  CATEGORY_GRADIENT[t.category]
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CATEGORY_IMAGE[t.category]}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover ${
                    OBJECT_POSITIONS[i % OBJECT_POSITIONS.length]
                  } transition-transform duration-500 group-hover:scale-105`}
                />
                {/* 底部压暗，保证标题与描述可读 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />

                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/45 backdrop-blur-sm text-[10px] font-medium text-white">
                  {t.mode === "i2i" ? "图生图" : "文生图"} · {t.category}
                </span>

                <div className="absolute inset-x-2.5 bottom-2.5">
                  <h3 className="text-sm font-bold text-white drop-shadow mb-0.5">{t.name}</h3>
                  <p className="text-[10px] text-white/70 line-clamp-2 leading-snug">
                    {t.description}
                  </p>
                </div>

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
