"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import {
  TEMPLATE_CATEGORIES,
  templates,
  type TemplateCategory,
} from "@/data/templates";

type Filter = TemplateCategory | "全部";

export default function TemplateShowcase() {
  const [filter, setFilter] = useState<Filter>("全部");
  const [copied, setCopied] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["全部", templates.length]]);
    TEMPLATE_CATEGORIES.forEach((c) =>
      map.set(c, templates.filter((t) => t.category === c).length)
    );
    return map;
  }, []);

  const visible = useMemo(
    () => (filter === "全部" ? templates : templates.filter((t) => t.category === filter)),
    [filter]
  );

  const copy = (id: string, prompt: string) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section id="templates" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
        {templates.length} 个现成模板
      </h2>
      <p className="text-gray-500 text-center mb-8">
        每个模板都是调好的提示词，点「用这个」直接填进生成器，也可以复制走自己改
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {(["全部", ...TEMPLATE_CATEGORIES] as Filter[]).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              filter === c
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            {c}
            <span className={`ml-1.5 ${filter === c ? "text-white/60" : "text-gray-400"}`}>
              {counts.get(c)}
            </span>
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((t) => (
          <div
            key={t.id}
            className="group flex flex-col bg-white rounded-2xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-base font-semibold text-gray-900">{t.name}</h3>
              <span
                className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  t.mode === "i2i" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"
                }`}
              >
                {t.mode === "i2i" ? "图生图" : "文生图"}
              </span>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{t.description}</p>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">{t.category}</span>
              <span className="text-gray-200">·</span>
              <span className="text-gray-400">{t.ratio === "auto" ? "自动比例" : t.ratio}</span>
              <div className="ml-auto flex items-center gap-1.5">
                <button
                  onClick={() => copy(t.id, t.prompt)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors"
                >
                  {copied === t.id ? (
                    <>
                      <Check size={11} /> 已复制
                    </>
                  ) : (
                    <>
                      <Copy size={11} /> 复制
                    </>
                  )}
                </button>
                <a
                  href={`/?template=${t.id}#generator`}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-900 hover:bg-black text-white rounded-lg font-medium transition-colors"
                >
                  用这个 <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
