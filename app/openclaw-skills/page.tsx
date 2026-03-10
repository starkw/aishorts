"use client";

import { useState } from "react";
import { Download, Star, ExternalLink, Search } from "lucide-react";
import Link from "next/link";

const skills = [
  {
    id: 1,
    name: "Tavily Web Search",
    slug: "tavily-search",
    description: "AI 优化的网络搜索工具，通过 Tavily API 返回简洁、相关的结果，专为 AI 智能体设计。",
    downloads: 161000,
    stars: 815,
    author: "arun-8687",
    category: "搜索",
    url: "https://clawhub.ai/skills/tavily-search",
    hot: true,
  },
  {
    id: 2,
    name: "Summarize",
    slug: "summarize",
    description: "一键总结 URL、PDF、图片、音频和 YouTube 视频内容，支持多种格式输入。",
    downloads: 119000,
    stars: 478,
    author: "steipete",
    category: "效率",
    url: "https://clawhub.ai/skills/summarize",
    hot: true,
  },
  {
    id: 3,
    name: "Gog（Google Workspace）",
    slug: "gog",
    description: "通过 CLI 操控 Gmail、日历、云盘、联系人、表格和文档，让 AI 帮你管理 Google 全家桶。",
    downloads: 99900,
    stars: 695,
    author: "steipete",
    category: "效率",
    url: "https://clawhub.ai/skills/gog",
    hot: true,
  },
  {
    id: 4,
    name: "GitHub",
    slug: "github",
    description: "通过 gh CLI 与 GitHub 交互，管理 Issues、PR、CI 运行和 API 查询。",
    downloads: 91000,
    stars: 300,
    author: "steipete",
    category: "开发",
    url: "https://clawhub.ai/skills/github",
    hot: false,
  },
  {
    id: 5,
    name: "Weather",
    slug: "weather",
    description: "获取当前天气和未来预报，无需 API Key，开箱即用。",
    downloads: 77600,
    stars: 252,
    author: "steipete",
    category: "生活",
    url: "https://clawhub.ai/skills/weather",
    hot: false,
  },
  {
    id: 6,
    name: "Agent Browser",
    slug: "agent-browser",
    description: "基于 Rust 的高速无头浏览器自动化工具，支持 AI 智能体导航、点击、输入和截图。",
    downloads: 75000,
    stars: 410,
    author: "TheRealT",
    category: "自动化",
    url: "https://clawhub.ai/skills/agent-browser",
    hot: true,
  },
  {
    id: 7,
    name: "Proactive Agent",
    slug: "proactive-agent",
    description: "将 AI 从任务执行者转变为主动合作伙伴，能预判需求并持续自我优化，支持自主定时任务。",
    downloads: 68000,
    stars: 380,
    author: "steipete",
    category: "AI 增强",
    url: "https://clawhub.ai/skills/proactive-agent",
    hot: true,
  },
  {
    id: 8,
    name: "Sono CLI",
    slug: "sono-cli",
    description: "控制 Sonos 音响系统，支持发现设备、查看状态、播放音乐、调节音量和分组管理。",
    downloads: 53200,
    stars: 37,
    author: "steipete",
    category: "生活",
    url: "https://clawhub.ai/skills/sono-cli",
    hot: false,
  },
  {
    id: 9,
    name: "Nano PDF",
    slug: "nano-pdf",
    description: "用自然语言指令编辑 PDF 文件，让 AI 直接操作和修改你的 PDF 文档。",
    downloads: 48800,
    stars: 114,
    author: "steipete",
    category: "文件",
    url: "https://clawhub.ai/skills/nano-pdf",
    hot: false,
  },
  {
    id: 10,
    name: "Notion",
    slug: "notion",
    description: "通过 Notion API 创建和管理页面、数据库和内容块，让 AI 直接操控你的 Notion 工作区。",
    downloads: 48700,
    stars: 171,
    author: "steipete",
    category: "效率",
    url: "https://clawhub.ai/skills/notion",
    hot: false,
  },
  {
    id: 11,
    name: "Humanizer",
    slug: "humanizer",
    description: "去除 AI 生成文本的痕迹，让内容读起来更自然、更像真人写作。",
    downloads: 46000,
    stars: 290,
    author: "community",
    category: "写作",
    url: "https://clawhub.ai/skills/humanizer",
    hot: true,
  },
  {
    id: 12,
    name: "Obsidian",
    slug: "obsidian",
    description: "操控 Obsidian 笔记库，自动化管理 Markdown 笔记，支持读写和搜索。",
    downloads: 43500,
    stars: 175,
    author: "steipete",
    category: "笔记",
    url: "https://clawhub.ai/skills/obsidian",
    hot: false,
  },
  {
    id: 13,
    name: "Nano Banana Pro",
    slug: "nano-banana-pro",
    description: "基于 Gemini 的 AI 图像生成和编辑工具，支持文字生图、图生图，最高支持 4K 分辨率。",
    downloads: 41000,
    stars: 220,
    author: "steipete",
    category: "图像",
    url: "https://clawhub.ai/skills/nano-banana-pro",
    hot: true,
  },
  {
    id: 14,
    name: "OpenAI Whisper",
    slug: "openai-whisper",
    description: "本地语音转文字工具，无需 API Key，直接在本地运行 Whisper 模型。",
    downloads: 38900,
    stars: 187,
    author: "steipete",
    category: "语音",
    url: "https://clawhub.ai/skills/openai-whisper",
    hot: false,
  },
  {
    id: 15,
    name: "API Gateway",
    slug: "api-gateway",
    description: "连接 100+ API（Google Workspace、Microsoft 365、GitHub、Notion、Slack 等），统一 OAuth 授权管理。",
    downloads: 36000,
    stars: 198,
    author: "byungkyu",
    category: "开发",
    url: "https://clawhub.ai/skills/api-gateway",
    hot: true,
  },
  {
    id: 16,
    name: "Brave Search",
    slug: "brave-search",
    description: "通过 Brave Search API 进行网络搜索和内容提取，轻量级，无需浏览器，保护隐私。",
    downloads: 34600,
    stars: 156,
    author: "steipete",
    category: "搜索",
    url: "https://clawhub.ai/skills/brave-search",
    hot: false,
  },
  {
    id: 17,
    name: "Automation Workflow",
    slug: "automation-workflow",
    description: "设计和实现自动化工作流，帮助独立创业者节省时间，实现重复任务自动化和规模化运营。",
    downloads: 28000,
    stars: 142,
    author: "community",
    category: "自动化",
    url: "https://clawhub.ai/skills/automation-workflow",
    hot: false,
  },
  {
    id: 18,
    name: "Self-Improving Agent",
    slug: "self-improving-agent",
    description: "自我反思 + 自我批评 + 自我学习 + 自我组织记忆，AI 智能体持续进化，自动从错误中学习。",
    downloads: 25000,
    stars: 310,
    author: "community",
    category: "AI 增强",
    url: "https://clawhub.ai/skills/self-improving-agent",
    hot: true,
  },
  {
    id: 19,
    name: "Find Skill",
    slug: "find-skill",
    description: "帮助用户在 ClawHub 上发现和安装最适合需求的技能，智能推荐技能包。",
    downloads: 22000,
    stars: 88,
    author: "community",
    category: "工具",
    url: "https://clawhub.ai/skills/find-skill",
    hot: false,
  },
  {
    id: 20,
    name: "Multi Search Engine",
    slug: "multi-search-engine",
    description: "集成 17 个搜索引擎（8 个国内 + 9 个国际），支持高级搜索语法、时间过滤、站内搜索和隐私引擎。",
    downloads: 19000,
    stars: 134,
    author: "community",
    category: "搜索",
    url: "https://clawhub.ai/skills/multi-search-engine",
    hot: false,
  },
];

const categories = ["全部", "搜索", "效率", "开发", "生活", "自动化", "AI 增强", "文件", "笔记", "图像", "语音", "写作", "工具"];

function formatNumber(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "k";
  return n.toString();
}

export default function OpenClawSkillsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");

  const filtered = skills.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.includes(search);
    const matchCategory = activeCategory === "全部" || s.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 text-sm text-orange-600 font-medium mb-5">
          🦞 OpenClaw 技能市场
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          热门 OpenClaw 技能包
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          精选 ClawHub 最受欢迎的技能，让你的 AI 助手真正帮你做事
        </p>

        {/* 数据 */}
        <div className="flex justify-center gap-10 mb-8 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-500">19,447</div>
            <div className="text-sm text-gray-400">技能总数</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-500">161k+</div>
            <div className="text-sm text-gray-400">最高下载量</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-500">20</div>
            <div className="text-sm text-gray-400">精选热门</div>
          </div>
        </div>

        {/* 搜索框 */}
        <div className="relative max-w-lg mx-auto">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索技能..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </section>

      {/* 分类 */}
      <section className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-orange-500 text-white shadow"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 技能卡片列表 */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <p className="text-sm text-gray-400 mb-4">
          共 {filtered.length} 个技能，数据来源：
          <a href="https://clawhub.ai" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline ml-1">ClawHub</a>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((skill) => (
            <a
              key={skill.id}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🦞</span>
                  <span className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {skill.name}
                  </span>
                  {skill.hot && (
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                      🔥 热门
                    </span>
                  )}
                </div>
                <ExternalLink size={14} className="text-gray-300 group-hover:text-orange-400 mt-1 flex-shrink-0" />
              </div>

              <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                {skill.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Download size={12} />
                    {formatNumber(skill.downloads)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} />
                    {skill.stars}
                  </span>
                  <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {skill.category}
                  </span>
                </div>
                <span className="text-xs text-gray-400">@{skill.author}</span>
              </div>
            </a>
          ))}
        </div>

        {/* 查看更多 */}
        <div className="text-center mt-10">
          <a
            href="https://clawhub.ai/skills?sort=downloads"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            查看全部 19,447 个技能
            <ExternalLink size={15} />
          </a>
        </div>
      </section>
    </main>
  );
}
