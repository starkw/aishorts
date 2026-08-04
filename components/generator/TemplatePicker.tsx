"use client";

import { useMemo, useState } from "react";
import { Search, Wand2 } from "lucide-react";
import {
  TEMPLATE_CATEGORIES,
  templates,
  type Template,
  type TemplateCategory,
} from "@/data/templates";

const MODE_LABEL: Record<Template["mode"], string> = {
  t2i: "文生图",
  i2i: "图生图",
};

interface Props {
  onPick: (template: Template) => void;
}

export default function TemplatePicker({ onPick }: Props) {
  const [category, setCategory] = useState<TemplateCategory | "全部">("全部");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return templates.filter((t) => {
      const matchCategory = category === "全部" || t.category === category;
      const matchQuery =
        q === "" ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.prompt.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [category, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 shrink-0">
          <Wand2 size={15} className="text-indigo-500" />
          从模板开始
          <span className="text-xs font-normal text-gray-400">{templates.length} 个</span>
        </div>
        <div className="relative flex-1 sm:max-w-xs sm:ml-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索模板…"
            className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {(["全部", ...TEMPLATE_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              category === c
                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 max-h-80 overflow-y-auto pr-1">
          {visible.map((t) => (
            <button
              key={t.id}
              onClick={() => onPick(t)}
              className="group text-left p-3 rounded-xl border border-gray-200 bg-white hover:border-indigo-400 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-sm font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {t.name}
                </span>
                <span
                  className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    t.mode === "i2i"
                      ? "bg-purple-50 text-purple-600"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {MODE_LABEL[t.mode]}
                </span>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{t.description}</p>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 text-center py-8">没有匹配的模板，换个关键词试试</p>
      )}
    </div>
  );
}
