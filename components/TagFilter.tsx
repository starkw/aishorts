"use client";

import { cn } from "@/lib/utils";
import { TAGS, type Tag } from "@/data/prompts";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";

interface TagFilterProps {
  selectedTag: Tag | null;
  onTagSelect: (tag: Tag | null) => void;
}

export default function TagFilter({ selectedTag, onTagSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* 全部按钮 - 使用 button（主页内筛选） */}
      <button
        onClick={() => onTagSelect(null)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
          selectedTag === null
            ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
            : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
        )}
      >
        <LayoutGrid size={13} />
        全部
      </button>
      {TAGS.map((tag) => (
        // 使用 <a> 标签让爬虫能发现 /tags/xxx 页面，同时保留点击筛选功能
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag)}`}
          onClick={(e) => {
            e.preventDefault();
            onTagSelect(selectedTag === tag ? null : tag);
          }}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
            selectedTag === tag
              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
              : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
          )}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
