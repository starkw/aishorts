"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_GRADIENT,
  templateImage,
  TEMPLATE_CATEGORIES,
  templates,
  type Template,
  type TemplateCategory,
} from "@/data/templates";

interface Props {
  onPick: (template: Template) => void;
}

export default function TemplatePicker({ onPick }: Props) {
  const [category, setCategory] = useState<TemplateCategory | "全部">("全部");

  const visible = useMemo(
    () => (category === "全部" ? templates : templates.filter((t) => t.category === category)),
    [category]
  );

  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-gray-600">或者，挑一个风格开始：</span>
        <span className="text-sm font-semibold text-gray-300">{templates.length}</span>
      </div>

      {/* 分类标签，横向可滑 */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-0.5 px-0.5 pb-0.5">
        {(["全部", ...TEMPLATE_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              category === c
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 模板缩略卡，横向滑动 */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-0.5 px-0.5">
        {visible.map((t) => (
          <button
            key={t.id}
            onClick={() => onPick(t)}
            title={t.description}
            className="group shrink-0 w-[104px] text-left"
          >
            <div
              className={`relative w-[104px] h-[104px] rounded-xl bg-gradient-to-br ${
                CATEGORY_GRADIENT[t.category]
              } overflow-hidden ring-1 ring-black/5 group-hover:ring-2 group-hover:ring-amber-400 transition-all`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={templateImage(t)}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />
              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/45 backdrop-blur-sm text-[9px] font-medium text-white">
                {t.mode === "i2i" ? "图生图" : "文生图"}
              </span>
              <span className="absolute inset-x-1.5 bottom-1.5 text-[11px] font-semibold text-white leading-tight drop-shadow">
                {t.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
