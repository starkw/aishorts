"use client";

import { useState } from "react";
import { Copy, Check, Heart, Tag } from "lucide-react";
import { cn, formatCount } from "@/lib/utils";
import type { Prompt, Tag as TagType } from "@/data/prompts";

interface PromptCardProps {
  prompt: Prompt;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  onTagClick: (tag: TagType) => void;
}

export default function PromptCard({
  prompt,
  isFavorited,
  onToggleFavorite,
  onTagClick,
}: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = prompt.prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-1">
          {prompt.title}
        </h3>
        <button
          onClick={() => onToggleFavorite(prompt.id)}
          className={cn(
            "shrink-0 p-1.5 rounded-full transition-colors",
            isFavorited
              ? "text-red-500 bg-red-50 hover:bg-red-100"
              : "text-gray-400 hover:text-red-400 hover:bg-red-50"
          )}
          title={isFavorited ? "取消收藏" : "收藏"}
        >
          <Heart
            size={16}
            className={cn(isFavorited && "fill-current")}
          />
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
        {prompt.description}
      </p>

      {/* Prompt Preview */}
      <div
        className="bg-gray-50 rounded-xl p-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <p
          className={cn(
            "text-xs text-gray-600 leading-relaxed font-mono",
            !expanded && "line-clamp-3"
          )}
        >
          {prompt.prompt}
        </p>
        {prompt.prompt.length > 150 && (
          <span className="text-xs text-indigo-500 mt-1 inline-block">
            {expanded ? "收起 ↑" : "展开 ↓"}
          </span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {prompt.tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
          >
            <Tag size={10} />
            {tag}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="font-medium text-gray-600">{formatCount(prompt.usageCount)}</span>
          <span>次使用</span>
          {prompt.isUserShared && (
            <span className="ml-1 px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded text-xs">
              社区
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
            copied
              ? "bg-green-500 text-white"
              : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
          )}
        >
          {copied ? (
            <>
              <Check size={13} />
              已复制
            </>
          ) : (
            <>
              <Copy size={13} />
              复制
            </>
          )}
        </button>
      </div>
    </div>
  );
}
