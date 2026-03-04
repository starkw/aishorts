"use client";

import { useState } from "react";
import { MessageSquare, Bug, Lightbulb, Star, Send, CheckCircle, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

const FEEDBACK_TYPES = [
  { value: "bug", label: "🐛 报告问题", icon: Bug, desc: "功能异常、页面错误" },
  { value: "feature", label: "💡 功能建议", icon: Lightbulb, desc: "新功能、改进建议" },
  { value: "prompt", label: "✨ 提交提示词", icon: Star, desc: "分享你的优质提示词" },
  { value: "other", label: "💬 其他反馈", icon: MessageSquare, desc: "其他任何想说的" },
];

export default function FeedbackPage() {
  const { data: session } = useSession();
  const [type, setType] = useState("feature");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !content.trim()) {
      setError("请填写标题和内容");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          title: title.trim(),
          content: content.trim(),
          contact: contact.trim(),
          user_email: session?.user?.email || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "提交失败");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "提交失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">感谢你的反馈！</h2>
          <p className="text-gray-500 mb-6">
            你的每一条反馈都将帮助我们把产品做得更好。我们会认真阅读每一条内容！
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setSubmitted(false);
                setTitle("");
                setContent("");
                setContact("");
                setType("feature");
              }}
              className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              再提交一条
            </button>
            <a
              href="/"
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              返回首页
            </a>
          </div>
        </div>
      </main>
    );
  }

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
          <p className="text-gray-500">
            你的每一条反馈都在帮助我们进步。无论是 Bug、建议还是优质提示词，都欢迎告诉我们！
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 反馈类型 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">反馈类型</label>
            <div className="grid grid-cols-2 gap-3">
              {FEEDBACK_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    type === t.value
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 bg-white hover:border-indigo-300"
                  }`}
                >
                  <t.icon size={18} className={type === t.value ? "text-indigo-600 mt-0.5" : "text-gray-400 mt-0.5"} />
                  <div>
                    <div className={`text-sm font-medium ${type === t.value ? "text-indigo-700" : "text-gray-700"}`}>
                      {t.label}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{t.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 标题 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              标题 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="简短描述你的反馈..."
              maxLength={100}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all bg-white"
            />
          </div>

          {/* 内容 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              详细描述 <span className="text-red-400">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                type === "prompt"
                  ? "请填写提示词内容，包括使用场景、效果说明等..."
                  : type === "bug"
                  ? "请描述问题出现的步骤、现象、截图等..."
                  : "请详细描述你的想法或建议..."
              }
              rows={6}
              maxLength={2000}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all bg-white resize-none"
            />
            <div className="text-right text-xs text-gray-400 mt-1">{content.length}/2000</div>
          </div>

          {/* 联系方式 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              联系方式 <span className="text-gray-400 font-normal">（选填，方便我们回复）</span>
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="邮箱 / 微信 / QQ"
              maxLength={100}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all bg-white"
            />
          </div>

          {/* 错误提示 */}
          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors text-sm"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            {loading ? "提交中..." : "提交反馈"}
          </button>

          <p className="text-center text-xs text-gray-400">
            我们会认真阅读每一条反馈，感谢你为 AI Shorts 做出的贡献 💙
          </p>
        </form>
      </section>
    </main>
  );
}
