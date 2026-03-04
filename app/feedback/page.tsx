"use client";

import { useState, useEffect } from "react";
import { Send, Loader2, MessageSquare, User } from "lucide-react";

interface FeedbackItem {
  id: string;
  username: string;
  content: string;
  created_at: string;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "刚刚";
  if (mins < 60) return `${mins} 分钟前`;
  if (hours < 24) return `${hours} 小时前`;
  return `${days} 天前`;
}

export default function FeedbackPage() {
  const [list, setList] = useState<FeedbackItem[]>([]);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const fetchList = async () => {
    try {
      const res = await fetch("/api/feedback");
      if (res.ok) {
        const data = await res.json();
        setList(data.feedbacks || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!content.trim()) { setError("请填写反馈内容"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim() || "匿名用户",
          content: content.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "提交失败");
      }
      setContent("");
      setUsername("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      await fetchList();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "提交失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-b border-gray-100 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            <MessageSquare size={12} />
            用户反馈
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">欢迎反馈</h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
            你的每一条反馈都将帮助我们把产品做得更好。无论是 Bug、功能建议还是优质提示词，我们都认真阅读每一条！
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* 发表反馈 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">发表反馈</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="你的昵称（选填，默认匿名）"
              maxLength={30}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="分享你的想法、建议或优质提示词..."
              rows={4}
              maxLength={1000}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{content.length}/1000</span>
              <div className="flex items-center gap-3">
                {error && <p className="text-red-500 text-xs">{error}</p>}
                {success && <p className="text-green-500 text-xs">✓ 反馈已提交！</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  提交
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 反馈列表 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MessageSquare size={14} />
            <span>共 <span className="font-semibold text-gray-800">{list.length}</span> 条反馈</span>
          </div>

          {fetching ? (
            <div className="text-center py-12 text-gray-400">
              <Loader2 size={24} className="animate-spin mx-auto mb-2" />
              <p className="text-sm">加载中...</p>
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <MessageSquare size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">还没有反馈，来第一个留言吧！</p>
            </div>
          ) : (
            list.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.username}</p>
                    <p className="text-xs text-gray-400">{timeAgo(item.created_at)}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{item.content}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
