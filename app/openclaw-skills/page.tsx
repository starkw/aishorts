"use client";

import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";

const skills = [
  // 必装
  {
    id: 1,
    emoji: "🏗️",
    name: "多Agent团队配置",
    description: "一只龙虾变一支团队——配置多个AI角色协作，总指挥+笔杆子+参谋+运营官。",
    tags: ["官方", "必装", "热门"],
    category: "办公",
  },
  {
    id: 2,
    emoji: "🌐",
    name: "网页搜索",
    description: "Brave搜索+DuckDuckGo多引擎搜索，实时获取网络信息。",
    tags: ["官方", "必装"],
    category: "研究",
  },
  {
    id: 3,
    emoji: "🌤️",
    name: "天气查询",
    description: "全球天气实时查询，wttr.in + Open-Meteo双源数据，精准可靠。",
    tags: ["官方", "必装"],
    category: "生活",
  },
  {
    id: 4,
    emoji: "🃏",
    name: "飞书互动卡片",
    description: "发送按钮、表单、投票、链接卡片，让飞书消息更丰富。",
    tags: ["官方", "必装"],
    category: "办公",
  },
  {
    id: 5,
    emoji: "🖼️",
    name: "AI图片生成",
    description: "Nano Banana Pro(Gemini 3)文生图、图生图、风格迁移，一键出图。",
    tags: ["官方", "必装"],
    category: "创作",
  },
  {
    id: 6,
    emoji: "🎙️",
    name: "语音合成",
    description: "中文多音色TTS，飞书原生语音条发送。edge-tts+ffmpeg驱动。",
    tags: ["官方", "必装"],
    category: "创作",
  },
  {
    id: 7,
    emoji: "🔭",
    name: "浏览器控制",
    description: "无头Chrome截图、网页自动化、视觉调试，让龙虾帮你开网页。",
    tags: ["官方", "必装"],
    category: "开发",
  },
  {
    id: 8,
    emoji: "🧑",
    name: "AI文本人性化",
    description: "16种检测模式+6种风格转换，去除AI味。支持小红书/知乎/学术风格。",
    tags: ["官方", "必装"],
    category: "创作",
  },
  {
    id: 9,
    emoji: "🕷️",
    name: "反爬网页访问",
    description: "微信公众号/Twitter/Reddit等反爬网站，三种方法自动切换，突破封锁。",
    tags: ["官方", "必装"],
    category: "研究",
  },
  {
    id: 10,
    emoji: "📄",
    name: "PDF生成",
    description: "Markdown转精美PDF，中文+代码高亮。Pandoc+Chrome双引擎。",
    tags: ["官方", "必装"],
    category: "办公",
  },
  {
    id: 11,
    emoji: "🚄",
    name: "火车票查询",
    description: "12306余票、车次时刻表、票价查询，出行规划一步到位。",
    tags: ["官方", "必装"],
    category: "生活",
  },
  {
    id: 12,
    emoji: "✈️",
    name: "机票查询",
    description: "国内外机票价格、多日比价、最低价日历，抢到最便宜的票。",
    tags: ["官方", "必装"],
    category: "生活",
  },
  {
    id: 13,
    emoji: "🔍",
    name: "SEO内容写作",
    description: "SEO优化的长文写作，关键词策略+结构化内容，让文章被搜索引擎发现。",
    tags: ["官方", "必装"],
    category: "创作",
  },
  {
    id: 14,
    emoji: "📊",
    name: "工作汇报生成",
    description: "从Session历史自动生成工作总结PDF，支持日报/周报，一键汇报。",
    tags: ["官方", "必装"],
    category: "办公",
  },
  {
    id: 15,
    emoji: "🗣️",
    name: "傅盛语音克隆",
    description: "用傅盛老板的声音进行语音合成，发送到飞书，独特体验。",
    tags: ["官方", "必装"],
    category: "创作",
  },
  // 热门
  {
    id: 16,
    emoji: "📕",
    name: "小红书运营",
    description: "搜索笔记、发布内容、分析评论。基于xiaohongshu-mcp(8400+⭐)，让龙虾帮你运营小红书。",
    tags: ["官方", "热门"],
    category: "社媒",
  },
  {
    id: 17,
    emoji: "📈",
    name: "股票监控",
    description: "A股/港股/美股实时监控，RSI/MACD/布林带多指标买卖信号，智能提醒。",
    tags: ["官方", "热门"],
    category: "生活",
  },
  {
    id: 18,
    emoji: "🎬",
    name: "视频总结",
    description: "YouTube/Bilibili视频自动获取字幕并AI总结，输出md格式，再也不用看完整视频。",
    tags: ["官方", "热门"],
    category: "研究",
  },
  {
    id: 19,
    emoji: "🔥",
    name: "今日热榜",
    description: "微博/知乎/抖音/百度等各平台热搜榜单，一键获取全网热点，不错过任何话题。",
    tags: ["官方", "热门"],
    category: "研究",
  },
  {
    id: 20,
    emoji: "🎬",
    name: "AI视频制作",
    description: "Sora/Kling/Seedance/Veo 3等37个模型，文生视频、图生视频，一个API搞定。",
    tags: ["社区", "热门"],
    category: "创作",
  },
  // 官方普通
  {
    id: 21,
    emoji: "🔬",
    name: "深度研究",
    description: "多引擎搜索+网页提取+结构化分析报告，让龙虾做专业级研究。",
    tags: ["官方"],
    category: "研究",
  },
  {
    id: 22,
    emoji: "📧",
    name: "邮件管理",
    description: "飞书邮件监控+ClawPost邮箱，自动检查+智能回复，邮件不再积压。",
    tags: ["官方"],
    category: "办公",
  },
  {
    id: 23,
    emoji: "📄",
    name: "飞书文档",
    description: "飞书文档读写、知识库管理、多维表格操作，办公全自动。",
    tags: ["官方"],
    category: "办公",
  },
  {
    id: 24,
    emoji: "📅",
    name: "飞书日历",
    description: "日程读取、会议安排、日程提醒，让龙虾做你的贴身助理。",
    tags: ["官方"],
    category: "办公",
  },
  {
    id: 25,
    emoji: "💻",
    name: "代码助手",
    description: "Claude Code/Codex写代码、改Bug、部署。PTY模式自动应答，开发效率翻倍。",
    tags: ["官方"],
    category: "开发",
  },
  {
    id: 26,
    emoji: "🐙",
    name: "GitHub操作",
    description: "仓库/Issues/PR/代码搜索/Actions，不开网页管GitHub，全命令行搞定。",
    tags: ["官方"],
    category: "开发",
  },
  {
    id: 27,
    emoji: "💚",
    name: "微信公众号",
    description: "傅盛写作风格+标题策略+排版规范，完整公众号创作流程，一键生成爆款。",
    tags: ["官方"],
    category: "社媒",
  },
  {
    id: 28,
    emoji: "🐦",
    name: "Twitter / X",
    description: "发推/Thread/转推/删除，轻松管理Twitter账号运营，不用切换网页。",
    tags: ["官方"],
    category: "社媒",
  },
  {
    id: 29,
    emoji: "📰",
    name: "Hacker News",
    description: "HN前页热帖抓取，支持按主题过滤(tech/health/AI)，技术圈动态一手掌握。",
    tags: ["官方"],
    category: "研究",
  },
  {
    id: 30,
    emoji: "📊",
    name: "股票深度分析",
    description: "Yahoo Finance数据+8维评分+持仓管理+热门扫描+传闻捕捉，专业投研助手。",
    tags: ["官方"],
    category: "生活",
  },
  {
    id: 31,
    emoji: "🇭🇰",
    name: "港股AI投研",
    description: "港股AI概念板块专属投研，南向资金博弈+产业基本面分析，港股必备。",
    tags: ["官方"],
    category: "生活",
  },
  {
    id: 32,
    emoji: "📋",
    name: "项目管理",
    description: "飞书多维表格驱动的项目管理，任务创建/更新/日报/通知，团队协作神器。",
    tags: ["官方"],
    category: "办公",
  },
  {
    id: 33,
    emoji: "⚡",
    name: "自动化工作流",
    description: "设计n8n工作流JSON，含触发器/重试/错误处理/人工审核，自动化一切。",
    tags: ["官方"],
    category: "办公",
  },
  {
    id: 34,
    emoji: "✍️",
    name: "博客写手",
    description: "长文写作+排版+发布，支持多平台格式适配，让龙虾帮你写爆款博客。",
    tags: ["官方"],
    category: "创作",
  },
  {
    id: 35,
    emoji: "🧠",
    name: "基础智能包",
    description: "记忆系统、上下文管理、任务追踪。龙虾出厂标配，必须装上。",
    tags: ["官方"],
    category: "办公",
  },
  {
    id: 36,
    emoji: "🧊",
    name: "网页净化提取",
    description: "通过distil.net代理获取干净Markdown，绕过复杂网页，提取纯净内容。",
    tags: ["官方"],
    category: "研究",
  },
  {
    id: 37,
    emoji: "🧬",
    name: "自我进化引擎",
    description: "分析运行历史自动识别改进点，协议约束下的能力进化，越用越聪明。",
    tags: ["官方"],
    category: "开发",
  },
  {
    id: 38,
    emoji: "🛡️",
    name: "安全审计",
    description: "Skill安全扫描+系统安全加固+风险评估，给你的龙虾加上安全防护。",
    tags: ["官方"],
    category: "开发",
  },
  {
    id: 39,
    emoji: "🕵️",
    name: "竞品研究",
    description: "竞品信息收集、对比分析、市场定位研究，知己知彼百战不殆。",
    tags: ["官方"],
    category: "研究",
  },
  // 社区
  {
    id: 40,
    emoji: "🎵",
    name: "AI音乐生成",
    description: "从结构化作曲计划生成高质量音频，AI作曲+质量验证+失败重试。",
    tags: ["社区"],
    category: "创作",
  },
  {
    id: 41,
    emoji: "💼",
    name: "LinkedIn运营",
    description: "LinkedIn内容体系搭建、思想领导力建设、收件箱管理，职场必备。",
    tags: ["社区"],
    category: "社媒",
  },
];

const categories = ["全部", "创作", "社媒", "研究", "办公", "开发", "生活"];

const tagConfig: Record<string, { label: string; className: string }> = {
  必装: { label: "⭐ 必装", className: "bg-yellow-100 text-yellow-700" },
  热门: { label: "🔥 热门", className: "bg-orange-100 text-orange-600" },
  官方: { label: "官方", className: "bg-blue-50 text-blue-600" },
  社区: { label: "社区", className: "bg-purple-50 text-purple-600" },
};

export default function OpenClawSkillsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");
  const [activeFilter, setActiveFilter] = useState("全部");

  const filtered = skills.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.includes(search);
    const matchCategory = activeCategory === "全部" || s.category === activeCategory;
    const matchFilter =
      activeFilter === "全部" ||
      (activeFilter === "必装" && s.tags.includes("必装")) ||
      (activeFilter === "热门" && s.tags.includes("热门")) ||
      (activeFilter === "社区" && s.tags.includes("社区"));
    return matchSearch && matchCategory && matchFilter;
  });

  const mustInstall = skills.filter((s) => s.tags.includes("必装")).length;
  const hot = skills.filter((s) => s.tags.includes("热门")).length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50/40 to-white">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-1.5 text-sm text-orange-600 font-medium mb-5">
          🦞 OpenClaw 技能市场
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          龙虾技能包商店
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-2">
          装上技能，变身数字员工——你的龙虾，由你定义
        </p>
        <p className="text-sm text-gray-400 mb-8">
          数据来源：
          <a href="https://sanwan.ai/skills.html" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
            三万 · 龙虾养成日记
          </a>
        </p>

        {/* 统计 */}
        <div className="flex justify-center gap-10 mb-8">
          <div>
            <div className="text-2xl font-bold text-orange-500">{skills.length}+</div>
            <div className="text-sm text-gray-400">精选技能</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-500">{mustInstall}</div>
            <div className="text-sm text-gray-400">⭐ 必装</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-500">{hot}</div>
            <div className="text-sm text-gray-400">🔥 热门</div>
          </div>
        </div>

        {/* 搜索 */}
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

      {/* 筛选栏 */}
      <section className="max-w-5xl mx-auto px-4 mb-4">
        {/* 快速筛选 */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {["全部", "必装", "热门", "社区"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                activeFilter === f
                  ? "bg-orange-500 text-white border-orange-500 shadow"
                  : "bg-white border-gray-200 text-gray-600 hover:border-orange-300"
              }`}
            >
              {f === "必装" ? "⭐ 必装" : f === "热门" ? "🔥 热门" : f}
            </button>
          ))}
          <span className="border-l border-gray-200 mx-1" />
          {/* 分类 */}
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                activeCategory === cat
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
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
            <a
              key={skill.id}
              href="https://sanwan.ai/skills.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col"
            >
              {/* 标题行 */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{skill.emoji}</span>
                  <span className="font-semibold text-gray-900 text-sm group-hover:text-orange-600 transition-colors leading-tight">
                    {skill.name}
                  </span>
                </div>
                <ExternalLink size={13} className="text-gray-300 group-hover:text-orange-400 mt-0.5 flex-shrink-0" />
              </div>

              {/* 描述 */}
              <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-1 line-clamp-2">
                {skill.description}
              </p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-1.5">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagConfig[tag]?.className ?? "bg-gray-100 text-gray-500"}`}
                  >
                    {tagConfig[tag]?.label ?? tag}
                  </span>
                ))}
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-400">
                  {skill.category}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* 底部 CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-8">
          <div className="text-3xl mb-3">🦞</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">还有 5000+ 社区技能等你探索</h3>
          <p className="text-sm text-gray-500 mb-5">在 Claw123.ai 浏览更多社区技能，一行命令安装</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://sanwan.ai/skills.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              查看全部技能
              <ExternalLink size={14} />
            </a>
            <a
              href="https://openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-orange-300 text-orange-600 hover:bg-orange-50 px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              了解 OpenClaw
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
