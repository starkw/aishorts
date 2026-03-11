"use client";

import { useState } from "react";
import { Search, Copy, Check } from "lucide-react";

const skills = [
  // 必装
  {
    id: 1,
    emoji: "🏗️",
    name: "多Agent团队配置",
    description: "一只龙虾变一支团队——配置多个AI角色协作，总指挥+笔杆子+参谋+运营官。",
    installCmd: "clawhub install multi-agent-team",
    tags: ["必装", "热门"],
    category: "办公",
  },
  {
    id: 2,
    emoji: "🌐",
    name: "网页搜索",
    description: "Brave搜索+DuckDuckGo多引擎搜索，实时获取网络信息，龙虾上网冲浪。",
    installCmd: "clawhub install web-search",
    tags: ["必装"],
    category: "研究",
  },
  {
    id: 3,
    emoji: "🌤️",
    name: "天气查询",
    description: "全球天气实时查询，wttr.in + Open-Meteo双源数据，精准可靠。",
    installCmd: "clawhub install weather",
    tags: ["必装"],
    category: "生活",
  },
  {
    id: 4,
    emoji: "🃏",
    name: "飞书互动卡片",
    description: "发送按钮、表单、投票、链接卡片，让飞书消息更丰富，互动感更强。",
    installCmd: "clawhub install feishu-card",
    tags: ["必装"],
    category: "办公",
  },
  {
    id: 5,
    emoji: "🖼️",
    name: "AI图片生成",
    description: "Nano Banana Pro(Gemini 3)文生图、图生图、风格迁移，一键出图。",
    installCmd: "clawhub install ai-image-gen",
    tags: ["必装"],
    category: "创作",
  },
  {
    id: 6,
    emoji: "🎙️",
    name: "语音合成",
    description: "中文多音色TTS，飞书原生语音条发送，edge-tts+ffmpeg驱动。",
    installCmd: "clawhub install tts",
    tags: ["必装"],
    category: "创作",
  },
  {
    id: 7,
    emoji: "🔭",
    name: "浏览器控制",
    description: "无头Chrome截图、网页自动化、视觉调试，让龙虾帮你操控浏览器。",
    installCmd: "clawhub install browser-control",
    tags: ["必装"],
    category: "开发",
  },
  {
    id: 8,
    emoji: "🧑",
    name: "AI文本人性化",
    description: "16种检测模式+6种风格转换，去除AI味。支持小红书/知乎/学术风格。",
    installCmd: "clawhub install humanizer",
    tags: ["必装"],
    category: "创作",
  },
  {
    id: 9,
    emoji: "🕷️",
    name: "反爬网页访问",
    description: "微信公众号/Twitter/Reddit等反爬网站，三种方法自动切换，突破封锁。",
    installCmd: "clawhub install anti-crawl",
    tags: ["必装"],
    category: "研究",
  },
  {
    id: 10,
    emoji: "📄",
    name: "PDF生成",
    description: "Markdown转精美PDF，中文+代码高亮，Pandoc+Chrome双引擎驱动。",
    installCmd: "clawhub install pdf-gen",
    tags: ["必装"],
    category: "办公",
  },
  {
    id: 11,
    emoji: "🚄",
    name: "火车票查询",
    description: "12306余票、车次时刻表、票价查询，出行规划一步到位。",
    installCmd: "clawhub install train-ticket",
    tags: ["必装"],
    category: "生活",
  },
  {
    id: 12,
    emoji: "✈️",
    name: "机票查询",
    description: "国内外机票价格、多日比价、最低价日历，抢到最便宜的票。",
    installCmd: "clawhub install flight-ticket",
    tags: ["必装"],
    category: "生活",
  },
  {
    id: 13,
    emoji: "🔍",
    name: "SEO内容写作",
    description: "SEO优化的长文写作，关键词策略+结构化内容，让文章被搜索引擎发现。",
    installCmd: "clawhub install seo-writer",
    tags: ["必装"],
    category: "创作",
  },
  {
    id: 14,
    emoji: "📊",
    name: "工作汇报生成",
    description: "从会话历史自动生成工作总结PDF，支持日报/周报，一键汇报不费脑。",
    installCmd: "clawhub install work-report",
    tags: ["必装"],
    category: "办公",
  },
  {
    id: 15,
    emoji: "🗣️",
    name: "声音克隆合成",
    description: "指定音色进行语音合成并发送到飞书，独特的语音交互体验。",
    installCmd: "clawhub install voice-clone",
    tags: ["必装"],
    category: "创作",
  },
  // 热门
  {
    id: 16,
    emoji: "📕",
    name: "小红书运营",
    description: "搜索笔记、发布内容、分析评论，让龙虾帮你全自动运营小红书账号。",
    installCmd: "clawhub install xiaohongshu",
    tags: ["热门"],
    category: "社媒",
  },
  {
    id: 17,
    emoji: "📈",
    name: "股票监控",
    description: "A股/港股/美股实时监控，RSI/MACD/布林带多指标买卖信号，智能提醒。",
    installCmd: "clawhub install stock-monitor",
    tags: ["热门"],
    category: "生活",
  },
  {
    id: 18,
    emoji: "🎬",
    name: "视频总结",
    description: "YouTube/Bilibili视频自动获取字幕并AI总结，输出md格式，再也不用看完整视频。",
    installCmd: "clawhub install video-summary",
    tags: ["热门"],
    category: "研究",
  },
  {
    id: 19,
    emoji: "🔥",
    name: "今日热榜",
    description: "微博/知乎/抖音/百度等各平台热搜榜单，一键获取全网热点，不错过任何话题。",
    installCmd: "clawhub install hot-topics",
    tags: ["热门"],
    category: "研究",
  },
  {
    id: 20,
    emoji: "🎬",
    name: "AI视频制作",
    description: "Sora/Kling/Seedance/Veo 3等37个模型，文生视频、图生视频，一个入口搞定。",
    installCmd: "clawhub install ai-video",
    tags: ["热门", "社区"],
    category: "创作",
  },
  // 普通官方
  {
    id: 21,
    emoji: "🔬",
    name: "深度研究",
    description: "多引擎搜索+网页提取+结构化分析报告，让龙虾做专业级研究。",
    installCmd: "clawhub install deep-research",
    tags: [],
    category: "研究",
  },
  {
    id: 22,
    emoji: "📧",
    name: "邮件管理",
    description: "邮件监控+自动检查+智能回复，邮件不再积压，龙虾帮你清空收件箱。",
    installCmd: "clawhub install email",
    tags: [],
    category: "办公",
  },
  {
    id: 23,
    emoji: "📄",
    name: "飞书文档",
    description: "飞书文档读写、知识库管理、多维表格操作，办公全自动。",
    installCmd: "clawhub install feishu-doc",
    tags: [],
    category: "办公",
  },
  {
    id: 24,
    emoji: "📅",
    name: "飞书日历",
    description: "日程读取、会议安排、日程提醒，让龙虾做你的贴身助理。",
    installCmd: "clawhub install feishu-calendar",
    tags: [],
    category: "办公",
  },
  {
    id: 25,
    emoji: "💻",
    name: "代码助手",
    description: "写代码、改Bug、自动部署，PTY模式自动应答，开发效率翻倍。",
    installCmd: "clawhub install code-assistant",
    tags: [],
    category: "开发",
  },
  {
    id: 26,
    emoji: "🐙",
    name: "GitHub操作",
    description: "仓库/Issues/PR/代码搜索/Actions，不开网页管GitHub，全命令行搞定。",
    installCmd: "clawhub install github",
    tags: [],
    category: "开发",
  },
  {
    id: 27,
    emoji: "💚",
    name: "微信公众号写作",
    description: "爆款写作风格+标题策略+排版规范，完整公众号创作流程，一键生成。",
    installCmd: "clawhub install wechat-article",
    tags: [],
    category: "社媒",
  },
  {
    id: 28,
    emoji: "🐦",
    name: "Twitter / X",
    description: "发推/Thread/转推/删除，轻松管理Twitter账号运营，不用切换网页。",
    installCmd: "clawhub install twitter",
    tags: [],
    category: "社媒",
  },
  {
    id: 29,
    emoji: "📰",
    name: "Hacker News",
    description: "HN前页热帖抓取，支持按主题过滤(tech/health/AI)，技术圈动态一手掌握。",
    installCmd: "clawhub install hacker-news",
    tags: [],
    category: "研究",
  },
  {
    id: 30,
    emoji: "📊",
    name: "股票深度分析",
    description: "全球股市数据+8维评分+持仓管理+热门扫描，专业投研助手。",
    installCmd: "clawhub install stock-analysis",
    tags: [],
    category: "生活",
  },
  {
    id: 31,
    emoji: "🇭🇰",
    name: "港股AI投研",
    description: "港股AI概念板块专属投研，南向资金博弈+产业基本面分析，港股必备。",
    installCmd: "clawhub install hk-stock",
    tags: [],
    category: "生活",
  },
  {
    id: 32,
    emoji: "📋",
    name: "项目管理",
    description: "多维表格驱动的项目管理，任务创建/更新/日报/通知，团队协作神器。",
    installCmd: "clawhub install project-mgmt",
    tags: [],
    category: "办公",
  },
  {
    id: 33,
    emoji: "⚡",
    name: "自动化工作流",
    description: "设计自动化工作流，含触发器/重试/错误处理/人工审核，自动化一切。",
    installCmd: "clawhub install auto-workflow",
    tags: [],
    category: "办公",
  },
  {
    id: 34,
    emoji: "✍️",
    name: "博客写手",
    description: "长文写作+排版+发布，支持多平台格式适配，让龙虾帮你写爆款博客。",
    installCmd: "clawhub install blog-writer",
    tags: [],
    category: "创作",
  },
  {
    id: 35,
    emoji: "🧠",
    name: "基础智能包",
    description: "记忆系统、上下文管理、任务追踪，龙虾出厂标配，增强基础能力。",
    installCmd: "clawhub install base-intelligence",
    tags: [],
    category: "办公",
  },
  {
    id: 36,
    emoji: "🧊",
    name: "网页净化提取",
    description: "获取干净Markdown内容，绕过复杂网页，提取纯净文章正文。",
    installCmd: "clawhub install web-extract",
    tags: [],
    category: "研究",
  },
  {
    id: 37,
    emoji: "🧬",
    name: "自我进化引擎",
    description: "分析运行历史自动识别改进点，协议约束下的能力进化，越用越聪明。",
    installCmd: "clawhub install self-evolve",
    tags: [],
    category: "开发",
  },
  {
    id: 38,
    emoji: "🛡️",
    name: "安全审计",
    description: "技能安全扫描+系统安全加固+风险评估，给你的龙虾加上安全防护。",
    installCmd: "clawhub install security-audit",
    tags: [],
    category: "开发",
  },
  {
    id: 39,
    emoji: "🕵️",
    name: "竞品研究",
    description: "竞品信息收集、对比分析、市场定位研究，知己知彼百战不殆。",
    installCmd: "clawhub install competitor-research",
    tags: [],
    category: "研究",
  },
  {
    id: 40,
    emoji: "🎵",
    name: "AI音乐生成",
    description: "从结构化作曲计划生成高质量音频，AI作曲+质量验证+失败重试。",
    installCmd: "clawhub install ai-music",
    tags: ["社区"],
    category: "创作",
  },
  {
    id: 41,
    emoji: "💼",
    name: "LinkedIn运营",
    description: "LinkedIn内容体系搭建、思想领导力建设、收件箱管理，职场必备。",
    installCmd: "clawhub install linkedin",
    tags: ["社区"],
    category: "社媒",
  },
];

const categories = ["创作", "社媒", "研究", "办公", "开发", "生活"];

const tagConfig: Record<string, { label: string; className: string }> = {
  必装: { label: "⭐ 必装", className: "bg-yellow-100 text-yellow-700" },
  热门: { label: "🔥 热门", className: "bg-orange-100 text-orange-600" },
  社区: { label: "社区", className: "bg-purple-50 text-purple-600" },
};

function CopyButton({ cmd }: { cmd: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
        copied
          ? "bg-green-100 text-green-600"
          : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
      }`}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "已复制" : "复制命令"}
    </button>
  );
}

export default function OpenClawSkillsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");
  const [activeFilter, setActiveFilter] = useState("全部");

  const filtered = skills.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.includes(search);
    const matchCategory =
      activeCategory === "全部" || s.category === activeCategory;
    const matchFilter =
      activeFilter === "全部" ||
      (activeFilter === "必装" && s.tags.includes("必装")) ||
      (activeFilter === "热门" && s.tags.includes("热门")) ||
      (activeFilter === "社区" && s.tags.includes("社区"));
    return matchSearch && matchCategory && matchFilter;
  });

  const mustCount = skills.filter((s) => s.tags.includes("必装")).length;
  const hotCount = skills.filter((s) => s.tags.includes("热门")).length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50/40 to-white">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-8 text-center">
        <div className="text-8xl mb-4 select-none">🦞</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          龙虾技能包商店
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          装上技能，变身数字员工——你的龙虾，由你定义
        </p>

        {/* 统计 */}
        <div className="flex justify-center gap-10 mb-8">
          <div>
            <div className="text-2xl font-bold text-indigo-600">{skills.length}+</div>
            <div className="text-sm text-gray-400">精选技能</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-600">{mustCount}</div>
            <div className="text-sm text-gray-400">⭐ 必装</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-600">{hotCount}</div>
            <div className="text-sm text-gray-400">🔥 热门</div>
          </div>
        </div>

        {/* 搜索 */}
        <div className="relative max-w-lg mx-auto">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="搜索技能..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </section>

      {/* 筛选栏 */}
      <section className="max-w-5xl mx-auto px-4 mb-4">
        <div className="flex gap-2 flex-wrap items-center">
          {/* 全部 — 重置所有筛选 */}
          <button
            onClick={() => { setActiveFilter("全部"); setActiveCategory("全部"); }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
              activeFilter === "全部" && activeCategory === "全部"
                ? "bg-indigo-600 text-white border-indigo-600 shadow"
                : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
            }`}
          >
            全部
          </button>

          {/* 快速筛选：必装 / 热门 / 社区 */}
          {[
            { key: "必装", label: "⭐ 必装" },
            { key: "热门", label: "🔥 热门" },
            { key: "社区", label: "社区" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => { setActiveFilter(f.key); setActiveCategory("全部"); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                activeFilter === f.key
                  ? "bg-indigo-600 text-white border-indigo-600 shadow"
                  : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
              }`}
            >
              {f.label}
            </button>
          ))}

          <span className="w-px h-4 bg-gray-200 mx-1" />

          {/* 场景分类 */}
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setActiveFilter("全部"); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white border-indigo-600 shadow"
                  : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 技能卡片 */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <p className="text-sm text-gray-400 mb-4">共 {filtered.length} 个技能</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill) => (
            <div
              key={skill.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col"
            >
              {/* 标题行 */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{skill.emoji}</span>
                <span className="font-semibold text-gray-900 text-sm leading-tight">
                  {skill.name}
                </span>
              </div>

              {/* 描述 */}
              <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-1 line-clamp-2">
                {skill.description}
              </p>

              {/* 底部：标签 + 复制按钮 */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-1">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        tagConfig[tag]?.className ?? "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {tagConfig[tag]?.label ?? tag}
                    </span>
                  ))}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-400">
                    {skill.category}
                  </span>
                </div>
                <CopyButton cmd={skill.installCmd} />
              </div>
            </div>
          ))}
        </div>

        {/* 底部说明 */}
        <div className="mt-12 text-center bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-8">
          <div className="text-3xl mb-3">🦞</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            如何安装技能？
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            先全局安装 ClawHub CLI，再用 <code className="bg-gray-100 px-1 rounded text-xs">clawhub install</code> 命令安装技能
          </p>
          <div className="flex flex-col gap-2 items-center">
            <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 inline-block font-mono text-sm text-gray-700">
              npm i -g clawhub
            </div>
            <div className="text-xs text-gray-400">然后复制上方命令，在终端执行即可</div>
            <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 inline-block font-mono text-sm text-gray-700">
              clawhub install &lt;skill-name&gt;
            </div>
          </div>
        </div>
      </section>

      {/* 什么是龙虾？信息图模块 */}
      <section className="max-w-2xl mx-auto px-4 pb-24">
        {/* ===== 第一张信息图 ===== */}
        {/* 大标题 */}
        <div className="bg-yellow-200 border-2 border-yellow-400 rounded-xl px-6 py-4 text-center mb-1">
          <h2 className="text-3xl font-black text-gray-900 leading-tight">什么是 OpenClaw（龙虾AI）？</h2>
        </div>
        <div className="text-center text-base font-semibold text-gray-700 mb-5 py-2">
          从"动嘴"到"动手"，AI 智能体（Agent）的历史拐点
        </div>

        {/* SECTION 1 - 核心定义 */}
        <div className="border-2 border-blue-400 rounded-xl p-5 mb-4 bg-white">
          <div className="bg-blue-400 text-white text-sm font-bold px-4 py-1.5 rounded-lg inline-block mb-5">SECTION 1 - 核心定义</div>
          <div className="flex gap-4 mb-4">
            {/* 左：过去的AI */}
            <div className="flex-1 border border-gray-200 rounded-xl p-4 bg-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">🧑‍✈️</span>
                <span className="text-2xl">→</span>
                <span className="text-3xl">🙋</span>
                <span className="text-2xl">→</span>
                <span className="text-3xl">📋</span>
              </div>
              <div className="text-sm font-bold text-gray-800 mb-1">过去的 AI（军师）</div>
              <div className="text-xs text-gray-500 leading-relaxed">
                过去的AI（大模型）：是"军师"。你问怎么订机票，它给你列出步骤，<strong>你得自己去点</strong>。
              </div>
            </div>
            {/* 右：现在的龙虾 */}
            <div className="flex-1 border border-blue-200 rounded-xl p-4 bg-blue-50">
              <div className="bg-white border border-blue-300 rounded-lg px-2 py-1 text-xs text-blue-700 mb-2 text-center font-medium">
                💬 帮我订明天去北京的机票
              </div>
              <div className="flex items-center gap-1 mb-3 justify-center">
                <span className="text-2xl">👩‍💼</span>
                <span className="text-lg">→</span>
                <span className="text-2xl">🙋</span>
                <span className="text-lg">→</span>
                <span className="text-2xl">🖥️</span>
                <span className="text-lg">→</span>
                <span className="text-2xl">✅</span>
              </div>
              <div className="text-sm font-bold text-gray-800 mb-1">现在的龙虾（秘书）</div>
              <div className="text-xs text-gray-500 leading-relaxed">
                现在的龙虾(OpenClaw)：是"秘书"。<strong>直接接管你的系统</strong>，自动打开软件、比价、填信息，最后让你确认。
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="bg-yellow-200 border border-yellow-400 text-yellow-800 text-xs font-bold px-3 py-1 rounded-md">军师 vs 秘书</span>
            <span className="text-xs text-gray-500">← 视觉强调</span>
          </div>
        </div>

        {/* SECTION 2 & 3 并排 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* SECTION 2 */}
          <div className="border-2 border-green-400 rounded-xl p-4 bg-white">
            <div className="bg-green-400 text-white text-xs font-bold px-3 py-1.5 rounded-lg inline-block mb-4">SECTION 2 - 狂飙时间线</div>
            <div className="relative">
              {/* 时间轴竖线 */}
              <div className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-green-300" />
              <div className="space-y-4 pl-6">
                {[
                  { date: "2026.11", icon: "🕐", text: "雏形诞生，奥地利程序员的周末开源项目。" },
                  { date: "2026.01", icon: "📍", text: "经历更名风波定名 OpenClaw，演示视频火爆全网。" },
                  { date: "2026.03", icon: "⭐", text: "GitHub 超 18.6万 Stars（超越 React 登顶），全国出现「排队代装龙虾」奇观。" },
                ].map((item, i) => (
                  <div key={item.date} className="relative">
                    <div className={`absolute -left-[22px] w-3.5 h-3.5 rounded-full border-2 border-white ${i === 2 ? "bg-yellow-400" : "bg-green-400"} mt-0.5`} />
                    <div className="text-xs font-bold text-green-700 mb-0.5">{item.date} {item.icon}</div>
                    <div className="text-xs text-gray-600 leading-snug">{item.text}</div>
                  </div>
                ))}
              </div>
              {/* 上升曲线 SVG */}
              <div className="mt-3 rounded-lg overflow-hidden bg-green-50 p-2">
                <svg viewBox="0 0 200 60" className="w-full h-10">
                  <path d="M10,55 Q40,50 70,40 Q110,25 140,15 Q165,8 190,5" stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <path d="M10,55 Q40,50 70,40 Q110,25 140,15 Q165,8 190,5 L190,58 L10,58 Z" fill="#bbf7d0" opacity="0.5"/>
                  <text x="185" y="10" fontSize="10" fill="#16a34a">⭐</text>
                </svg>
              </div>
            </div>
          </div>

          {/* SECTION 3 */}
          <div className="border-2 border-pink-400 rounded-xl p-4 bg-white">
            <div className="bg-pink-400 text-white text-xs font-bold px-3 py-1.5 rounded-lg inline-block mb-4">SECTION 3 - 交互模式对比</div>
            <div className="text-center text-xl mb-3">⇌</div>
            {/* 军师模式 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
              <div className="text-xs font-bold text-blue-800 mb-2 text-center">军师模式：人机交互，需要人工执行</div>
              <div className="flex items-center justify-center gap-2 text-xs">
                <span className="bg-white border border-gray-200 rounded px-2 py-1">AI建议</span>
                <span className="text-gray-400 font-bold text-base">→</span>
                <span className="bg-white border border-gray-200 rounded px-2 py-1">人工操作</span>
              </div>
            </div>
            {/* 秘书模式 */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mb-3">
              <div className="text-xs font-bold text-indigo-800 mb-2 text-center">秘书模式：AI 自主执行，无需人工干预</div>
              <div className="flex items-center justify-center gap-2 text-xs">
                <span className="bg-white border border-gray-200 rounded px-2 py-1">AI决策</span>
                <span className="text-gray-400 font-bold text-base">→</span>
                <span className="bg-white border border-gray-200 rounded px-2 py-1">自动操作</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 text-center mb-3 font-medium">从"动嘴"到"动手"的范式跃迁</div>
            {/* 四步流程 */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
              {[
                { icon: "🧑", label: "用户意图" },
                { icon: "🧠", label: "AI 大脑" },
                { icon: "⚙️", label: "执行系统" },
                { icon: "✅", label: "完成任务" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-[10px] text-gray-500 text-center leading-tight">{s.label}</span>
                  </div>
                  {i < 3 && <span className="text-gray-300 font-bold mx-0.5 mb-3">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4 - 核心能力 */}
        <div className="border-2 border-purple-400 rounded-xl p-5 mb-4 bg-white">
          <div className="bg-purple-400 text-white text-sm font-bold px-4 py-1.5 rounded-lg inline-block mb-4">SECTION 4 - 核心能力</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "🧠", label: "多步推理能力" },
              { icon: "🦾", label: "自动化执行能力" },
              { icon: "☁️", label: "跨应用调用能力" },
              { icon: "⏰", label: "7×24 小时在线" },
              { icon: "💻", label: "低代码部署" },
              { icon: "📋", label: "可审计操作日志" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 py-3 px-2 border border-purple-100 rounded-xl bg-purple-50">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5 - 黄金结论（第一张图） */}
        <div className="border-2 border-yellow-400 rounded-xl p-5 mb-8 bg-yellow-50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">💡</span>
            <div className="bg-yellow-400 text-white text-sm font-bold px-4 py-1.5 rounded-lg">SECTION 5 - 黄金结论</div>
          </div>
          <p className="text-gray-800 font-medium leading-relaxed mb-2">
            黄仁勋称其为"这个时代最重要的软件发布"。
          </p>
          <p className="text-gray-700 leading-relaxed text-sm">
            因为它宣告了 AI 终于长出了"手脚"，开始入侵物理世界的操作系统。
          </p>
        </div>

        {/* ===== 第二张信息图 ===== */}
        <div className="bg-yellow-200 border-2 border-yellow-400 rounded-xl px-6 py-4 text-center mb-1">
          <h3 className="text-2xl font-black text-gray-900 leading-tight">龙虾凭什么能自己"干活"？</h3>
        </div>
        <div className="text-center text-sm font-semibold text-gray-700 mb-5 py-2">
          "手脑分离"架构与真实的生产力革命
        </div>

        {/* 底层原理 */}
        <div className="border-2 border-amber-400 rounded-xl p-5 mb-4 bg-white">
          <div className="bg-amber-400 text-white text-sm font-bold px-4 py-1.5 rounded-lg inline-block mb-4">底层原理</div>
          <div className="flex gap-4 mb-4">
            <div className="flex flex-col items-center justify-center gap-1 w-28 flex-shrink-0">
              <div className="flex gap-1">
                <span className="text-3xl">🧠</span>
                <span className="text-3xl">👁️</span>
              </div>
              <div className="flex gap-1">
                <span className="text-3xl">⚙️</span>
                <span className="text-3xl">🦾</span>
              </div>
              <div className="bg-amber-100 border border-amber-300 rounded-lg px-2 py-1 text-xs font-bold text-amber-800 text-center mt-1">手脑分离架构</div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <span className="text-xs font-bold text-amber-800">🦾 躯壳（执行层）：</span>
                <span className="text-xs text-gray-600"> OpenClaw 软件本身，负责"看"屏幕并模拟鼠标键盘操作。</span>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <span className="text-xs font-bold text-orange-800">🧠 大脑（思考层）：</span>
                <span className="text-xs text-gray-600"> 灵活插拔的大模型（如 DeepSeek、MiniMax、Kimi），大脑负责理解意图，指挥躯壳去点击。</span>
              </div>
            </div>
          </div>
        </div>

        {/* 架构优势 */}
        <div className="border-2 border-amber-300 rounded-xl p-5 mb-4 bg-white">
          <div className="bg-amber-300 text-white text-sm font-bold px-4 py-1.5 rounded-lg inline-block mb-4">架构优势</div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center justify-center gap-1 w-28 flex-shrink-0">
              <div className="flex gap-1 items-end">
                <span className="text-2xl">🧩</span>
                <span className="text-xl">→</span>
                <span className="text-2xl">🧠</span>
              </div>
              <div className="flex gap-1 items-center">
                <span className="text-2xl">🧩</span>
                <span className="text-xl">→</span>
                <span className="text-2xl">⚙️</span>
              </div>
              <div className="text-[10px] text-gray-400 text-center mt-1">大脑(思考) / 躯壳(执行)<br/>Modular architecture</div>
            </div>
            <div className="flex-1 space-y-2">
              {[
                { icon: "🔌", title: "灵活插拔", desc: "支持多种大模型切换" },
                { icon: "🔒", title: "独立部署", desc: "可本地运行，保护数据隐私" },
                { icon: "🧩", title: "低代码", desc: "无需编程基础，快速上手" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-2 text-xs">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-bold text-gray-800">{item.title}：</span>
                  <span className="text-gray-600">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 执行流程 */}
        <div className="border-2 border-blue-300 rounded-xl p-5 mb-4 bg-white">
          <div className="bg-blue-300 text-white text-sm font-bold px-4 py-1.5 rounded-lg inline-block mb-4">执行流程</div>
          <div className="flex items-center justify-between mb-3">
            {[
              { icon: "🧑‍💬", color: "bg-blue-50" },
              { icon: "🧠", color: "bg-pink-50" },
              { icon: "📊", color: "bg-orange-50" },
              { icon: "🖥️", color: "bg-green-50" },
            ].map((step, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-14 h-14 ${step.color} border border-gray-200 rounded-xl flex items-center justify-center text-3xl shadow-sm`}>
                  {step.icon}
                </div>
                {i < 3 && (
                  <svg width="32" height="20" viewBox="0 0 32 20" className="mx-0.5">
                    <path d="M2,10 L26,10 M20,4 L28,10 L20,16" stroke="#facc15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-600 text-center font-medium">
            1. 用户下达意图 → 2. AI 大脑理解任务 → 3. 指挥执行系统 → 4. 完成自动化操作
          </div>
        </div>

        {/* 落地场景 */}
        <div className="border-2 border-teal-400 rounded-xl p-5 mb-4 bg-white">
          <div className="bg-teal-400 text-white text-sm font-bold px-4 py-1.5 rounded-lg inline-block mb-4">落地场景</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "📈", label: '金融圈"超级员工"', color: "bg-green-50 border-green-200" },
              { icon: "🛒", label: '创业圈"搞钱机器"', color: "bg-blue-50 border-blue-200" },
              { icon: "⏱️", label: "7×24 小时自动化", color: "bg-purple-50 border-purple-200" },
              { icon: "💰", label: "低 API 成本", color: "bg-yellow-50 border-yellow-200" },
              { icon: "🚀", label: "高效率产出", color: "bg-orange-50 border-orange-200" },
              { icon: "🔗", label: "可扩展性强", color: "bg-pink-50 border-pink-200" },
            ].map((item) => (
              <div key={item.label} className={`border rounded-xl p-3 flex flex-col items-center gap-2 ${item.color}`}>
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 黄金结论（第二张图） */}
        <div className="border-2 border-yellow-400 rounded-xl p-5 bg-yellow-50">
          <div className="bg-yellow-400 text-white text-sm font-bold px-4 py-1.5 rounded-lg inline-block mb-4">黄金结论</div>
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">💡</span>
            <div className="border-l-4 border-yellow-400 pl-3">
              <p className="text-gray-800 font-medium leading-relaxed text-sm">
                它不再是极客的代码玩具，而是<strong>实打实的生产力工具</strong>。
              </p>
              <p className="text-gray-700 font-medium leading-relaxed text-sm mt-1">
                UI 界面不再是给人看的，而是给 AI <strong>"点"</strong>的。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
