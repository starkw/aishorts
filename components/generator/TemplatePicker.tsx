"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [picked, setPicked] = useState<string | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () => (category === "全部" ? templates : templates.filter((t) => t.category === category)),
    [category]
  );

  const syncArrows = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  // 切换分类后内容变了，滚回开头并重算箭头可用状态
  useEffect(() => {
    railRef.current?.scrollTo({ left: 0 });
    syncArrows();
  }, [category, syncArrows]);

  const scroll = (dir: -1 | 1) => {
    const el = railRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const choose = (t: Template) => {
    setPicked(t.id);
    onPick(t);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-gray-600">或者，挑一个风格开始：</span>
        <span className="text-sm font-semibold text-gray-300">{visible.length}</span>
      </div>

      {/* 分类标签，装在胶囊容器里，横向可滑 */}
      <div className="flex gap-0.5 p-1 rounded-full bg-gray-100 overflow-x-auto no-scrollbar">
        {(["全部", ...TEMPLATE_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              category === c
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 模板卡，横向滑动 + 左右翻页 */}
      <div className="relative">
        <div
          ref={railRef}
          onScroll={syncArrows}
          className="flex gap-3 overflow-x-auto no-scrollbar pb-1"
        >
          {visible.map((t) => (
            <button
              key={t.id}
              onClick={() => choose(t)}
              className={`group shrink-0 w-[184px] text-left rounded-2xl bg-white overflow-hidden ring-1 transition-all ${
                picked === t.id
                  ? "ring-2 ring-amber-400"
                  : "ring-black/5 hover:ring-amber-300 hover:shadow-md"
              }`}
            >
              <div
                className={`relative h-[116px] bg-gradient-to-br ${CATEGORY_GRADIENT[t.category]}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={templateImage(t)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] font-bold text-white tracking-wide">
                  {t.mode === "i2i" ? "I2I" : "T2I"}
                </span>
              </div>
              <div className="px-3 py-2.5">
                <h4 className="text-[13px] font-semibold text-gray-900 truncate">{t.name}</h4>
                <p className="text-[11px] text-gray-500 leading-snug line-clamp-2 mt-0.5">
                  {t.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {!atStart && (
          <button
            onClick={() => scroll(-1)}
            aria-label="上一组"
            className="absolute left-1 top-[58px] -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md ring-1 ring-black/5 flex items-center justify-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={16} />
          </button>
        )}
        {!atEnd && (
          <button
            onClick={() => scroll(1)}
            aria-label="下一组"
            className="absolute right-1 top-[58px] -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md ring-1 ring-black/5 flex items-center justify-center text-gray-600 hover:text-gray-900"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
