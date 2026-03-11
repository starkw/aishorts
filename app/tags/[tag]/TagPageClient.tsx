"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Sparkles, TrendingUp, ArrowLeft } from "lucide-react";
import { prompts, TAGS, type Tag } from "@/data/prompts";
import PromptCard from "@/components/PromptCard";
import SearchBar from "@/components/SearchBar";
import { cn } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";

interface TagPageClientProps {
  initialTag: Tag;
}

export default function TagPageClient({ initialTag }: TagPageClientProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(initialTag);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/favorites")
        .then((r) => r.json())
        .then((data) => { if (data.favorites) setFavorites(data.favorites); })
        .catch(() => {});
    } else {
      const stored = localStorage.getItem("ai-short-favorites");
      if (stored) { try { setFavorites(JSON.parse(stored)); } catch { /* ignore */ } }
    }
  }, [session]);

  const toggleFavorite = async (id: string) => {
    const isCurrentlyFav = favorites.includes(id);
    const next = isCurrentlyFav ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(next);
    if (session?.user) {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: id, action: isCurrentlyFav ? "remove" : "add" }),
      }).catch(() => {});
    } else {
      localStorage.setItem("ai-short-favorites", JSON.stringify(next));
    }
  };

  const filteredPrompts = useMemo(() => {
    const q = search.toLowerCase();
    return prompts.filter((p) => {
      const matchSearch =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchTag = selectedTag === null || p.tags.includes(selectedTag);
      return matchSearch && matchTag;
    });
  }, [search, selectedTag]);

  const handleTagSelect = (tag: Tag | null) => {
    setSelectedTag(tag);
    if (tag === null) {
      router.push("/");
    } else {
      router.push(`/tags/${encodeURIComponent(tag)}`);
    }
  };

  const handleTagClick = (tag: Tag) => {
    handleTagSelect(tag);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-b border-gray-100 pb-8 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <Sparkles size={12} />
              {initialTag} · AI提示词
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {initialTag} 提示词精选
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
              精选 {filteredPrompts.length} 条{initialTag}场景AI提示词，复制即用
            </p>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </section>

      {/* Main */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* 返回+统计 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft size={14} />
              全部提示词
            </Link>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <TrendingUp size={15} className="text-indigo-500" />
              共 <span className="font-semibold text-gray-800">{filteredPrompts.length}</span> 个提示词
            </div>
          </div>
        </div>

        {/* 标签筛选 */}
        <div className="mb-6 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTagSelect(null)}
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
              <button
                key={tag}
                onClick={() => handleTagSelect(selectedTag === tag ? null : tag)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                  selectedTag === tag
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 卡片网格 */}
        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                isFavorited={favorites.includes(prompt.id)}
                onToggleFavorite={toggleFavorite}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">未找到匹配的提示词</h3>
            <p className="text-gray-400 text-sm mb-4">试试其他关键词</p>
            <button
              onClick={() => setSearch("")}
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
            >
              清除搜索
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded flex items-center justify-center">
              <Sparkles size={10} className="text-white" />
            </div>
            <span className="font-medium text-gray-700">AI Shorts</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
