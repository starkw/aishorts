"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Sparkles, TrendingUp, Users, Zap, Flame, Clock, ArrowRight } from "lucide-react";
import { prompts, TAGS, type Tag } from "@/data/prompts";
import PromptCard from "@/components/PromptCard";
import SearchBar from "@/components/SearchBar";
import TagFilter from "@/components/TagFilter";
import Link from "next/link";

type SortType = "popular" | "newest";

export default function HomePage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortType, setSortType] = useState<SortType>("popular");

  // 检测 URL 参数 ?favorites=1，自动激活收藏筛选
  useEffect(() => {
    if (searchParams.get("favorites") === "1") {
      setShowFavoritesOnly(true);
      setSelectedTag(null);
    }
  }, [searchParams]);

  // 加载收藏：登录用云端，未登录用 localStorage
  useEffect(() => {
    if (session?.user) {
      // 已登录：从服务器加载
      fetch("/api/favorites")
        .then((r) => r.json())
        .then((data) => {
          if (data.favorites) setFavorites(data.favorites);
        })
        .catch(() => {});
    } else {
      // 未登录：从 localStorage 加载
      const stored = localStorage.getItem("ai-short-favorites");
      if (stored) {
        try { setFavorites(JSON.parse(stored)); } catch { /* ignore */ }
      }
    }
  }, [session]);

  // 切换收藏：登录时同步云端，未登录存 localStorage
  const toggleFavorite = async (id: string) => {
    const isCurrentlyFav = favorites.includes(id);
    const next = isCurrentlyFav
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(next);

    if (session?.user) {
      // 同步到服务器
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: id, action: isCurrentlyFav ? "remove" : "add" }),
      }).catch(() => {});
    } else {
      // 存 localStorage
      localStorage.setItem("ai-short-favorites", JSON.stringify(next));
    }
  };

  // 筛选 + 排序逻辑
  const filteredPrompts = useMemo(() => {
    const q = search.toLowerCase();
    const filtered = prompts.filter((p) => {
      const matchSearch =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchTag = selectedTag === null || p.tags.includes(selectedTag);
      const matchFav = !showFavoritesOnly || favorites.includes(p.id);
      return matchSearch && matchTag && matchFav;
    });

    if (sortType === "newest") {
      return [...filtered].sort((a, b) => Number(b.id) - Number(a.id));
    }
    // popular（默认）
    return [...filtered].sort((a, b) => b.usageCount - a.usageCount);
  }, [search, selectedTag, showFavoritesOnly, favorites, sortType]);

  const handleTagClick = (tag: Tag) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
    setShowFavoritesOnly(false);
  };

  const totalUsage = prompts.reduce((sum, p) => sum + p.usageCount, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-b border-gray-100 pb-8 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* 标题 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <Sparkles size={12} />
              精选 AI 提示词库
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              让 AI 对话更高效
          </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
              精选高质量提示词，一键复制，立刻提升你的 AI 使用效率
            </p>
          </div>

          {/* 统计数据 */}
          <div className="flex justify-center gap-6 sm:gap-10 mb-8 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600">{prompts.length}+</div>
              <div className="text-xs text-gray-500 mt-0.5">精选提示词</div>
            </div>
            <div className="w-px bg-gray-200" />
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                {(totalUsage / 1000).toFixed(0)}K+
              </div>
              <div className="text-xs text-gray-500 mt-0.5">总使用次数</div>
            </div>
            <div className="w-px bg-gray-200" />
            <div>
              <div className="text-2xl font-bold text-indigo-600">{TAGS.length}</div>
              <div className="text-xs text-gray-500 mt-0.5">覆盖分类</div>
            </div>
          </div>

          {/* 搜索框 */}
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </section>

      {/* 🦞 OpenClaw 专区 Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <Link
          href="/tags/OpenClaw"
          className="group flex items-center justify-between gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-2xl px-5 py-4 sm:px-7 sm:py-5 transition-all shadow-md hover:shadow-lg"
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl sm:text-5xl">🦞</span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-white font-bold text-base sm:text-lg leading-tight">
                  OpenClaw 龙虾AI · 提示词专区
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 bg-white/20 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  🔥 全网最热
                </span>
              </div>
              <p className="text-indigo-100 text-xs sm:text-sm">
                20条实测提示词 · 自动抢票 / 自动发周报 / 自动监控竞品…
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-1 text-white/80 group-hover:text-white text-sm font-medium transition-colors">
            <span className="hidden sm:inline">查看全部</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* 工具栏 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp size={15} className="text-indigo-500" />
            <span>
              共 <span className="font-semibold text-gray-800">{filteredPrompts.length}</span> 个提示词
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* 排序按钮组 */}
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-1 py-1">
              <button
                onClick={() => setSortType("popular")}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  sortType === "popular"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-500 hover:text-indigo-600"
                }`}
              >
                <Flame size={11} />
                热门
              </button>
              <button
                onClick={() => setSortType("newest")}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  sortType === "newest"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-500 hover:text-indigo-600"
                }`}
              >
                <Clock size={11} />
                最新
              </button>
            </div>
            <button
              onClick={() => {
                setShowFavoritesOnly(!showFavoritesOnly);
                setSelectedTag(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                showFavoritesOnly
                  ? "bg-red-500 text-white border-red-500 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
              }`}
            >
              {showFavoritesOnly ? "❤️" : "🤍"} 我的收藏
              {favorites.length > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${showFavoritesOnly ? "bg-white/20" : "bg-red-100 text-red-500"}`}>
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 标签筛选 */}
        <div className="mb-6 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <TagFilter selectedTag={selectedTag} onTagSelect={setSelectedTag} />
        </div>

        {/* Prompt 卡片网格 */}
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
            <p className="text-gray-400 text-sm mb-4">试试其他关键词或清除筛选条件</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedTag(null);
                setShowFavoritesOnly(false);
              }}
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
          >
              清除所有筛选
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img src="/logo-v1.svg" alt="AI Shorts" width={20} height={20} />
            <span className="font-medium text-gray-700">AI Shorts</span>
            <span>© 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Users size={13} />
              社区贡献
            </span>
            <span className="flex items-center gap-1">
              <Zap size={13} />
              持续更新
            </span>
          </div>
        </div>
      </footer>
      </main>
  );
}
