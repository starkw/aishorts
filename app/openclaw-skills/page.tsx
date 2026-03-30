"use client";

import { useState, useMemo } from "react";
import { Search, Copy, Check } from "lucide-react";
import { skillsShTop100 } from "@/data/skills-sh-top100";
import { skillsShTrending24h, parseTrending24h } from "@/data/skills-sh-trending";

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
  // ========== Skills.sh 热门技能（AI Agent 开放技能生态） ==========
  {
    id: 100,
    emoji: "🔍",
    name: "Skills 技能查找器",
    description: "全球最大的开放 AI Agent 技能生态核心工具。587K+ 安装量，帮你在海量技能库中快速搜索、发现并安装所需技能，支持关键词和分类浏览。",
    installCmd: "npx skills add vercel-labs/skills",
    tags: ["Skills.sh", "热门"],
    category: "AI工具",
    downloads: "587K",
  },
  {
    id: 101,
    emoji: "⚛️",
    name: "Vercel React 最佳实践",
    description: "Vercel 官方出品的 React 开发最佳实践技能包。涵盖组件设计、状态管理、性能优化、SSR/SSG 策略，让 AI Agent 按 Vercel 标准写出高质量 React 代码。",
    installCmd: "npx skills add vercel-labs/agent-skills",
    tags: ["Skills.sh", "热门"],
    category: "前端",
    downloads: "218K",
  },
  {
    id: 102,
    emoji: "🎨",
    name: "网页设计规范",
    description: "Vercel 官方的网页设计指南技能。包括响应式布局、色彩体系、排版规范、组件一致性等，让 AI Agent 生成的页面符合专业设计标准。",
    installCmd: "npx skills add vercel-labs/agent-skills",
    tags: ["Skills.sh", "热门"],
    category: "设计",
    downloads: "173K",
  },
  {
    id: 103,
    emoji: "🖌️",
    name: "前端设计指南（Anthropic）",
    description: "Anthropic 官方出品的前端设计技能。教 AI Agent 如何从零构建美观的前端界面，涵盖 HTML/CSS/JS 最佳实践、动画交互、可访问性、现代 UI 模式。",
    installCmd: "npx skills add anthropics/skills",
    tags: ["Skills.sh", "热门"],
    category: "设计",
    downloads: "166K",
  },
  {
    id: 104,
    emoji: "🎬",
    name: "Remotion 视频制作",
    description: "用代码制作视频的最佳实践。Remotion 官方技能包，让 AI Agent 掌握程序化视频生成、动画编排、批量渲染、字幕叠加等高级技巧。",
    installCmd: "npx skills add remotion-dev/skills",
    tags: ["Skills.sh", "热门"],
    category: "创作",
    downloads: "152K",
  },
  {
    id: 105,
    emoji: "☁️",
    name: "Azure AI 服务",
    description: "微软官方 Azure AI 技能包。涵盖 Azure OpenAI、认知服务、机器学习部署等。138K+ 安装量，企业级 AI 开发必备，让 Agent 熟练操作 Azure 云服务。",
    installCmd: "npx skills add microsoft/github-copilot-for-azure",
    tags: ["Skills.sh", "热门"],
    category: "AI工具",
    downloads: "138K",
  },
  {
    id: 106,
    emoji: "🌐",
    name: "Agent 浏览器",
    description: "Vercel 官方的 AI Agent 浏览器控制技能。让 Agent 能像人一样浏览网页、截图、提取信息、填写表单、自动化网页操作，是 Agent 上网冲浪的核心能力。",
    installCmd: "npx skills add vercel-labs/agent-browser",
    tags: ["Skills.sh", "热门"],
    category: "AI工具",
    downloads: "106K",
  },
  {
    id: 107,
    emoji: "🧩",
    name: "Vercel 组合模式",
    description: "Vercel 官方的 React 组合模式技能。教 Agent 掌握 Server Components、Client Components、Streaming、Partial Prerendering 等现代 React 架构模式。",
    installCmd: "npx skills add vercel-labs/agent-skills",
    tags: ["Skills.sh"],
    category: "前端",
    downloads: "88K",
  },
  {
    id: 108,
    emoji: "🛠️",
    name: "技能创建器（Anthropic）",
    description: "Anthropic 官方出品的技能创建工具。帮你快速创建和发布自定义 AI Agent 技能，包含技能模板、测试框架和发布流程，人人都能成为技能开发者。",
    installCmd: "npx skills add anthropics/skills",
    tags: ["Skills.sh", "热门"],
    category: "AI工具",
    downloads: "88K",
  },
  {
    id: 109,
    emoji: "✨",
    name: "UI/UX 专业设计 Pro Max",
    description: "66K+ 安装量的顶级 UI/UX 设计技能。让 AI Agent 具备专业设计师水平，精通色彩理论、字体搭配、间距节奏、响应式布局、微交互动效和可用性测试。",
    installCmd: "npx skills add nextlevelbuilder/ui-ux-pro-max-skill",
    tags: ["Skills.sh", "热门"],
    category: "设计",
    downloads: "66K",
  },
  {
    id: 110,
    emoji: "📱",
    name: "React Native 开发",
    description: "Vercel 官方 React Native 技能包。涵盖跨平台移动开发最佳实践、导航管理、原生模块桥接、性能调优、热更新，让 Agent 帮你写手机 App。",
    installCmd: "npx skills add vercel-labs/agent-skills",
    tags: ["Skills.sh"],
    category: "前端",
    downloads: "62K",
  },
  {
    id: 111,
    emoji: "💡",
    name: "头脑风暴",
    description: "obra/superpowers 系列技能之一。帮助 AI Agent 进行结构化头脑风暴，从多角度发散思维、组织创意、评估可行性，产出高质量的创意方案。",
    installCmd: "npx skills add obra/superpowers",
    tags: ["Skills.sh"],
    category: "办公",
    downloads: "59K",
  },
  {
    id: 112,
    emoji: "🖼️",
    name: "AI 图片生成（Skills.sh）",
    description: "inferen-sh 出品的 AI 图片生成技能。支持文字描述生成图片、图片风格迁移、图片编辑等，集成多个主流图片生成模型，56K+ 安装量。",
    installCmd: "npx skills add inferen-sh/skills",
    tags: ["Skills.sh", "热门"],
    category: "创作",
    downloads: "56K",
  },
  {
    id: 113,
    emoji: "🤖",
    name: "浏览器自动化",
    description: "browser-use 官方技能包。50K+ 安装量，让 AI Agent 完全控制浏览器——自动登录、填表、爬取数据、截图、模拟点击，实现复杂的网页自动化流程。",
    installCmd: "npx skills add browser-use/browser-use",
    tags: ["Skills.sh", "热门"],
    category: "AI工具",
    downloads: "50K",
  },
  {
    id: 114,
    emoji: "📊",
    name: "SEO 审计分析",
    description: "45K+ 安装的专业 SEO 审计技能。让 Agent 自动检查网站的 SEO 健康度——分析 meta 标签、页面速度、移动端适配、关键词密度、反向链接，生成优化报告。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh", "热门"],
    category: "营销",
    downloads: "45K",
  },
  {
    id: 115,
    emoji: "📑",
    name: "PDF 文档处理（Anthropic）",
    description: "Anthropic 官方 PDF 处理技能。读取/解析/生成 PDF 文档，支持文本提取、表格识别、批量转换，办公必备。",
    installCmd: "npx skills add anthropics/skills",
    tags: ["Skills.sh"],
    category: "文档",
    downloads: "41K",
  },
  {
    id: 116,
    emoji: "✍️",
    name: "营销文案写作",
    description: "coreyhaines31 营销系列技能之一。让 AI Agent 写出高转化率的营销文案——Landing Page、广告标题、产品描述、邮件营销、社媒推文，38K+ 安装。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "38K",
  },
  {
    id: 117,
    emoji: "📽️",
    name: "PPT 演示文稿",
    description: "Anthropic 官方 PPTX 处理技能。AI Agent 可以创建、编辑、美化 PowerPoint 演示文稿，支持模板、图表、动画，36K+ 安装量。",
    installCmd: "npx skills add anthropics/skills",
    tags: ["Skills.sh"],
    category: "文档",
    downloads: "36K",
  },
  {
    id: 118,
    emoji: "🐘",
    name: "Supabase 数据库最佳实践",
    description: "Supabase 官方 Agent 技能包。让 AI Agent 精通 PostgreSQL 数据库设计、RLS 策略、Edge Functions、实时订阅、存储管理等 Supabase 全栈开发。",
    installCmd: "npx skills add supabase/agent-skills",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "36K",
  },
  {
    id: 119,
    emoji: "▲",
    name: "Next.js 最佳实践",
    description: "Vercel 官方 Next.js 技能包。涵盖 App Router、Server Actions、中间件、缓存策略、ISR/SSG/SSR 最佳实践，按 Vercel 标准写 Next.js 应用。",
    installCmd: "npx skills add vercel-labs/next-skills",
    tags: ["Skills.sh"],
    category: "前端",
    downloads: "36K",
  },
  {
    id: 120,
    emoji: "🛡️",
    name: "网站安全审计",
    description: "squirrelscan 出品的网站安全扫描技能。自动检测 XSS、CSRF、SQL 注入等安全漏洞，分析 HTTP 头安全配置，生成修复建议报告。",
    installCmd: "npx skills add squirrelscan/skills",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "36K",
  },
  {
    id: 121,
    emoji: "🔧",
    name: "系统化调试",
    description: "obra/superpowers 系列。教 AI Agent 用系统化方法排查 Bug——二分法定位、日志分析、堆栈追踪、断点策略，从猜测式调试升级为科学调试。",
    installCmd: "npx skills add obra/superpowers",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "32K",
  },
  {
    id: 122,
    emoji: "📝",
    name: "Word 文档处理",
    description: "Anthropic 官方 DOCX 技能。创建/编辑/转换 Word 文档，支持样式模板、表格、页眉页脚、批量文档处理，办公自动化利器。",
    installCmd: "npx skills add anthropics/skills",
    tags: ["Skills.sh"],
    category: "文档",
    downloads: "32K",
  },
  {
    id: 123,
    emoji: "📋",
    name: "写作计划",
    description: "obra/superpowers 系列。帮 AI Agent 制定结构化写作计划——大纲设计、章节编排、论点组织、素材收集，适合长文/报告/论文写作前的系统规划。",
    installCmd: "npx skills add obra/superpowers",
    tags: ["Skills.sh"],
    category: "创作",
    downloads: "31K",
  },
  {
    id: 124,
    emoji: "📊",
    name: "Excel 表格处理",
    description: "Anthropic 官方 XLSX 技能。AI Agent 能读取/创建/编辑 Excel 表格，支持公式、图表、数据透视表、批量数据处理，数据分析必备。",
    installCmd: "npx skills add anthropics/skills",
    tags: ["Skills.sh"],
    category: "文档",
    downloads: "29K",
  },
  {
    id: 125,
    emoji: "🧠",
    name: "营销心理学",
    description: "coreyhaines31 营销系列。让 AI Agent 掌握消费者心理学——锚定效应、社会认同、稀缺性、损失厌恶等 20+ 营销心理策略，写出更有说服力的文案。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "27K",
  },
  {
    id: 126,
    emoji: "🧪",
    name: "测试驱动开发（TDD）",
    description: "obra/superpowers 系列。教 AI Agent 实践 TDD——先写测试再写代码、红绿重构循环、单元测试/集成测试策略，写出更可靠的代码。",
    installCmd: "npx skills add obra/superpowers",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "27K",
  },
  {
    id: 127,
    emoji: "🌐",
    name: "Web 应用测试",
    description: "Anthropic 官方 Web 应用测试技能。涵盖端到端测试、性能测试、可访问性测试、跨浏览器兼容性、自动化回归测试，保障应用质量。",
    installCmd: "npx skills add anthropics/skills",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "26K",
  },
  {
    id: 128,
    emoji: "🔗",
    name: "程序化 SEO",
    description: "coreyhaines31 营销系列。教 Agent 实现程序化 SEO——自动生成 Landing Page、动态 meta 标签、内链策略、Schema 标记，批量生产 SEO 内容。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "25K",
  },
  {
    id: 129,
    emoji: "📈",
    name: "内容策略",
    description: "coreyhaines31 营销系列。从内容定位到发布日历，全面的内容营销策略——受众分析、关键词规划、内容矩阵、分发渠道、效果追踪。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "25K",
  },
  {
    id: 130,
    emoji: "🔐",
    name: "Better Auth 认证最佳实践",
    description: "better-auth 官方技能包。让 AI Agent 掌握现代认证方案——OAuth、JWT、Session、MFA、社交登录、密码哈希，构建安全的用户认证系统。",
    installCmd: "npx skills add better-auth/skills",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "24K",
  },
  {
    id: 131,
    emoji: "🎯",
    name: "shadcn/ui 组件库",
    description: "shadcn 官方技能包。让 AI Agent 精通 shadcn/ui 组件用法——安装配置、主题定制、组件组合、表单验证、暗色模式，React 项目 UI 开发首选。",
    installCmd: "npx skills add shadcn/ui",
    tags: ["Skills.sh"],
    category: "前端",
    downloads: "22K",
  },
  {
    id: 132,
    emoji: "🔌",
    name: "MCP 服务构建器",
    description: "Anthropic 官方 MCP（Model Context Protocol）构建技能。教 Agent 创建自定义 MCP 服务器，扩展 AI 的工具调用能力，连接任意外部系统。",
    installCmd: "npx skills add anthropics/skills",
    tags: ["Skills.sh"],
    category: "AI工具",
    downloads: "22K",
  },
  {
    id: 133,
    emoji: "📱",
    name: "社媒内容创作",
    description: "coreyhaines31 营销系列。帮 AI Agent 创作各平台社媒内容——Twitter/X、LinkedIn、Instagram 适配的文案风格、配图建议、发布时间策略。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "22K",
  },
  {
    id: 134,
    emoji: "💰",
    name: "营销创意生成",
    description: "coreyhaines31 营销系列。帮 Agent 快速生成营销创意——活动方案、推广角度、病毒式传播策略、跨界合作灵感，22K+ 安装。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "22K",
  },
  {
    id: 135,
    emoji: "🎨",
    name: "Canvas 画布设计",
    description: "Anthropic 官方 Canvas 设计技能。让 AI Agent 在 HTML5 Canvas 上绑制图表、信息图、数据可视化、交互动画，20K+ 安装。",
    installCmd: "npx skills add anthropics/skills",
    tags: ["Skills.sh"],
    category: "设计",
    downloads: "20K",
  },
  {
    id: 136,
    emoji: "🎨",
    name: "Tailwind 设计系统",
    description: "wshobson/agents 出品。教 AI Agent 用 Tailwind CSS 构建完整设计系统——色彩 Token、间距规范、响应式断点、组件样式、暗色模式。",
    installCmd: "npx skills add wshobson/agents",
    tags: ["Skills.sh"],
    category: "前端",
    downloads: "20K",
  },
  {
    id: 137,
    emoji: "✏️",
    name: "文案编辑",
    description: "coreyhaines31 营销系列。专业级文案润色和编辑——语法检查、语气调整、可读性优化、品牌一致性校验，21K+ 安装。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "21K",
  },
  {
    id: 138,
    emoji: "💲",
    name: "定价策略",
    description: "coreyhaines31 营销系列。帮 Agent 制定产品定价策略——竞品定价分析、心理定价、分级定价、促销策略、价值定位。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "21K",
  },
  {
    id: 139,
    emoji: "🚀",
    name: "产品上线策略",
    description: "coreyhaines31 营销系列。完整的产品发布策略——上线前预热、发布日执行清单、ProductHunt 策略、媒体联络、用户反馈收集。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "20K",
  },
  {
    id: 140,
    emoji: "🔥",
    name: "Firecrawl 网页爬取",
    description: "Firecrawl 官方技能包。让 AI Agent 强力爬取网页内容——绕过反爬、JavaScript 渲染、批量抓取、输出干净 Markdown/JSON，14K+ 安装。",
    installCmd: "npx skills add firecrawl/cli",
    tags: ["Skills.sh"],
    category: "AI工具",
    downloads: "14K",
  },
  {
    id: 141,
    emoji: "🤖",
    name: "AI SDK 开发",
    description: "Vercel AI SDK 官方技能包。教 Agent 使用 Vercel AI SDK 构建 AI 应用——流式输出、工具调用、结构化输出、多模型切换、聊天界面。",
    installCmd: "npx skills add vercel/ai",
    tags: ["Skills.sh"],
    category: "AI工具",
    downloads: "12K",
  },
  {
    id: 142,
    emoji: "📊",
    name: "数据分析",
    description: "supercent-io 技能模板。让 AI Agent 执行数据分析全流程——数据清洗、统计分析、可视化图表、趋势预测、报告生成。",
    installCmd: "npx skills add supercent-io/skills-template",
    tags: ["Skills.sh"],
    category: "办公",
    downloads: "12K",
  },
  {
    id: 143,
    emoji: "🎭",
    name: "中文文本人性化",
    description: "op7418 出品的中文 AI 文本去机器味技能。检测并改写 AI 生成的中文内容，让文风更加自然、口语化，适配小红书/知乎/公众号等平台风格。",
    installCmd: "npx skills add op7418/humanizer-zh",
    tags: ["Skills.sh"],
    category: "创作",
    downloads: "8.4K",
  },
  {
    id: 144,
    emoji: "🎭",
    name: "Playwright 测试最佳实践",
    description: "currents-dev 出品的 Playwright 测试技能。教 Agent 写出稳定的端到端测试——页面对象模式、网络拦截、视觉回归、并行执行、CI 集成。",
    installCmd: "npx skills add currents-dev/playwright-best-practices-skill",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "11K",
  },
  {
    id: 145,
    emoji: "💚",
    name: "Vue 最佳实践",
    description: "Vue 生态技能包。涵盖 Vue 3 Composition API、Pinia 状态管理、Vue Router、组件设计模式、TypeScript 集成等最佳实践。",
    installCmd: "npx skills add hyf0/vue-skills",
    tags: ["Skills.sh"],
    category: "前端",
    downloads: "9.8K",
  },
  {
    id: 146,
    emoji: "⚡",
    name: "Vite 构建工具",
    description: "antfu 出品的 Vite 技能包。教 Agent 精通 Vite 配置——插件开发、HMR 优化、构建优化、多页面应用、库模式打包。",
    installCmd: "npx skills add antfu/skills",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "9.9K",
  },
  {
    id: 147,
    emoji: "🐘",
    name: "Neon Postgres 数据库",
    description: "Neon 官方 Agent 技能包。让 AI Agent 精通 Serverless Postgres——连接管理、分支策略、查询优化、迁移脚本、自动扩缩容。",
    installCmd: "npx skills add neondatabase/agent-skills",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "9.3K",
  },
  {
    id: 148,
    emoji: "🧠",
    name: "自我进化 Agent",
    description: "charon-fan 出品。让 AI Agent 具备自我改进能力——分析历史对话、识别弱项、自动调整策略、持续优化表现，越用越聪明。",
    installCmd: "npx skills add charon-fan/agent-playbook",
    tags: ["Skills.sh"],
    category: "AI工具",
    downloads: "11K",
  },
  {
    id: 149,
    emoji: "🖥️",
    name: "界面设计",
    description: "dammyjay93 出品的专业界面设计技能。让 Agent 掌握完整的界面设计流程——信息架构、线框图、视觉设计、原型交互、设计规范输出。",
    installCmd: "npx skills add dammyjay93/interface-design",
    tags: ["Skills.sh"],
    category: "设计",
    downloads: "8.4K",
  },
  {
    id: 150,
    emoji: "🚀",
    name: "部署到 Vercel",
    description: "Vercel 官方部署技能。一键部署 Next.js/React/Vue 应用到 Vercel——域名绑定、环境变量、预览部署、自动 CI/CD、边缘函数配置。",
    installCmd: "npx skills add vercel-labs/agent-skills",
    tags: ["Skills.sh"],
    category: "部署",
    downloads: "8.5K",
  },
  {
    id: 151,
    emoji: "🔄",
    name: "Git 工作流",
    description: "supercent-io 技能模板。教 Agent 掌握专业的 Git 工作流——分支策略、Commit 规范、PR 流程、冲突解决、版本发布管理。",
    installCmd: "npx skills add supercent-io/skills-template",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "11K",
  },
  {
    id: 152,
    emoji: "📧",
    name: "邮件营销序列",
    description: "coreyhaines31 营销系列。设计高转化率的邮件营销自动化序列——欢迎邮件、培育流程、促销活动、弃购挽回、再激活策略。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "19K",
  },
  {
    id: 153,
    emoji: "📱",
    name: "Expo 原生 UI 构建",
    description: "Expo 官方技能包。帮 Agent 使用 Expo 构建跨平台原生 UI——组件库、导航、手势交互、动画、原生模块，19K+ 安装。",
    installCmd: "npx skills add expo/skills",
    tags: ["Skills.sh"],
    category: "前端",
    downloads: "19K",
  },
  {
    id: 154,
    emoji: "🏷️",
    name: "Schema 结构化标记",
    description: "coreyhaines31 营销系列。教 Agent 为网页添加 Schema.org 结构化数据——产品信息、评价、FAQ、面包屑，提升搜索引擎展示效果。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "19K",
  },
  {
    id: 155,
    emoji: "📰",
    name: "宝玉发微信公众号",
    description: "jimliu/baoyu-skills 系列。帮 AI Agent 自动撰写并发布微信公众号文章——排版、封面图、摘要、标签，12K+ 安装。",
    installCmd: "npx skills add jimliu/baoyu-skills",
    tags: ["Skills.sh"],
    category: "社媒",
    downloads: "12K",
  },
  {
    id: 156,
    emoji: "🖼️",
    name: "宝玉 AI 配图",
    description: "jimliu/baoyu-skills 系列。自动为文章生成高质量配图——风格匹配、尺寸适配、文字叠加，让每篇文章都有精美插图。",
    installCmd: "npx skills add jimliu/baoyu-skills",
    tags: ["Skills.sh"],
    category: "创作",
    downloads: "12K",
  },
  {
    id: 157,
    emoji: "📕",
    name: "宝玉小红书配图",
    description: "jimliu/baoyu-skills 系列。专门为小红书生成吸睛封面图和内容配图——符合小红书审美风格，提升点击率。",
    installCmd: "npx skills add jimliu/baoyu-skills",
    tags: ["Skills.sh"],
    category: "社媒",
    downloads: "11K",
  },
  {
    id: 158,
    emoji: "📊",
    name: "宝玉信息图",
    description: "jimliu/baoyu-skills 系列。自动生成数据信息图——图表、流程图、对比图、统计可视化，让数据更直观。",
    installCmd: "npx skills add jimliu/baoyu-skills",
    tags: ["Skills.sh"],
    category: "创作",
    downloads: "10K",
  },
  {
    id: 159,
    emoji: "🔍",
    name: "AI SEO 优化",
    description: "coreyhaines31 营销系列。针对 AI 搜索引擎优化——让内容被 ChatGPT、Perplexity、Gemini 等 AI 搜索引擎引用和推荐。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "12K",
  },
  {
    id: 160,
    emoji: "🔎",
    name: "Tavily 智能搜索",
    description: "Tavily AI 官方搜索技能。为 AI Agent 提供专门优化的实时网页搜索能力——比普通搜索更精准、更适合 Agent 理解和使用。",
    installCmd: "npx skills add tavily-ai/skills",
    tags: ["Skills.sh"],
    category: "AI工具",
    downloads: "12K",
  },
  {
    id: 161,
    emoji: "🎥",
    name: "Seedance2 视频 API",
    description: "hexiaochun 出品。集成 Seedance2 视频生成 API——文生视频、图生视频、视频编辑，高质量 AI 视频制作，12K+ 安装。",
    installCmd: "npx skills add hexiaochun/seedance2-api",
    tags: ["Skills.sh"],
    category: "创作",
    downloads: "12K",
  },
  {
    id: 162,
    emoji: "🏗️",
    name: "Turborepo 单体仓库",
    description: "Vercel Turborepo 官方技能包。让 Agent 精通 Monorepo 管理——任务编排、缓存策略、包管理、工作区配置，11K+ 安装。",
    installCmd: "npx skills add vercel/turborepo",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "11K",
  },
  {
    id: 163,
    emoji: "🎯",
    name: "广告创意",
    description: "coreyhaines31 营销系列。帮 Agent 制作高效广告创意——Facebook/Google/TikTok 广告文案、视觉设计建议、A/B 测试方案。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "11K",
  },
  {
    id: 164,
    emoji: "🏷️",
    name: "产品营销定位",
    description: "coreyhaines31 营销系列。帮 Agent 制定产品营销定位——目标用户画像、价值主张、竞品差异化、品牌故事，23K+ 安装。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "23K",
  },
  {
    id: 165,
    emoji: "🏆",
    name: "竞品替代方案",
    description: "coreyhaines31 营销系列。帮 Agent 分析竞品替代方案——功能对比、定价比较、迁移策略、SEO 竞品页面，19K+ 安装。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "19K",
  },
  {
    id: 166,
    emoji: "👋",
    name: "用户引导优化",
    description: "coreyhaines31 营销系列。优化用户 Onboarding 流程——注册引导、功能介绍、首次体验、激活策略，19K+ 安装。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "19K",
  },
  {
    id: 167,
    emoji: "🎪",
    name: "品牌视觉指南",
    description: "Anthropic 官方品牌设计技能。帮 Agent 制定完整的品牌视觉规范——Logo 使用、色彩系统、字体规范、图片风格、设计模板。",
    installCmd: "npx skills add anthropics/skills",
    tags: ["Skills.sh"],
    category: "设计",
    downloads: "14K",
  },
  {
    id: 168,
    emoji: "🎨",
    name: "主题工厂",
    description: "Anthropic 官方主题生成技能。帮 Agent 快速生成自定义 UI 主题——色彩方案、组件样式、暗色模式、品牌定制。",
    installCmd: "npx skills add anthropics/skills",
    tags: ["Skills.sh"],
    category: "设计",
    downloads: "16K",
  },
  {
    id: 169,
    emoji: "🔄",
    name: "代码重构",
    description: "supercent-io 技能模板。教 Agent 进行专业的代码重构——提取函数/类、简化条件、消除重复、提升可读性，保持测试通过。",
    installCmd: "npx skills add supercent-io/skills-template",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "11K",
  },
  {
    id: 170,
    emoji: "⚙️",
    name: "工作流自动化",
    description: "supercent-io 技能模板。教 Agent 设计和实现工作流自动化——CI/CD 管道、自动化脚本、任务调度、事件驱动流程。",
    installCmd: "npx skills add supercent-io/skills-template",
    tags: ["Skills.sh"],
    category: "办公",
    downloads: "12K",
  },
  {
    id: 171,
    emoji: "📖",
    name: "API 文档生成",
    description: "supercent-io 技能模板。帮 Agent 自动生成专业的 API 文档——OpenAPI/Swagger 规范、接口示例、错误码说明、使用指南。",
    installCmd: "npx skills add supercent-io/skills-template",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "11K",
  },
  {
    id: 172,
    emoji: "📐",
    name: "API 设计原则",
    description: "wshobson/agents 出品。教 Agent 设计优秀的 RESTful/GraphQL API——命名规范、版本策略、分页设计、错误处理、认证方案。",
    installCmd: "npx skills add wshobson/agents",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "10K",
  },
  {
    id: 173,
    emoji: "📝",
    name: "技术写作",
    description: "supercent-io 技能模板。教 Agent 写出专业技术文档——用户手册、开发指南、架构文档、变更日志，11K+ 安装。",
    installCmd: "npx skills add supercent-io/skills-template",
    tags: ["Skills.sh"],
    category: "创作",
    downloads: "11K",
  },
  {
    id: 174,
    emoji: "🍃",
    name: "SwiftUI 专家",
    description: "avdlee 出品的 SwiftUI 开发技能。让 Agent 精通 iOS/macOS 开发——视图组合、动画、数据流、Navigation、Widget，9K+ 安装。",
    installCmd: "npx skills add avdlee/swiftui-agent-skill",
    tags: ["Skills.sh"],
    category: "前端",
    downloads: "9.1K",
  },
  {
    id: 175,
    emoji: "🦋",
    name: "Flutter 动画",
    description: "madteacher 出品的 Flutter 动画技能。教 Agent 实现流畅的 Flutter 动画效果——隐式/显式动画、Hero 过渡、自定义 Painter。",
    installCmd: "npx skills add madteacher/mad-agents-skills",
    tags: ["Skills.sh"],
    category: "前端",
    downloads: "9.1K",
  },
  {
    id: 176,
    emoji: "🎯",
    name: "Next.js App Router 模式",
    description: "wshobson/agents 出品。深入 Next.js App Router 架构模式——布局嵌套、加载状态、错误边界、并行路由、拦截路由。",
    installCmd: "npx skills add wshobson/agents",
    tags: ["Skills.sh"],
    category: "前端",
    downloads: "8.8K",
  },
  {
    id: 177,
    emoji: "🏗️",
    name: "架构模式",
    description: "wshobson/agents 出品。教 Agent 掌握软件架构模式——微服务、事件驱动、CQRS、领域驱动设计、六边形架构、清洁架构。",
    installCmd: "npx skills add wshobson/agents",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "8.6K",
  },
  {
    id: 178,
    emoji: "📄",
    name: "文档协同写作",
    description: "Anthropic 官方文档协作技能。帮 Agent 参与多人文档协作——版本追踪、评审标注、合并冲突、协作编辑，13K+ 安装。",
    installCmd: "npx skills add anthropics/skills",
    tags: ["Skills.sh"],
    category: "文档",
    downloads: "13K",
  },
  {
    id: 179,
    emoji: "🎨",
    name: "Web Artifacts 构建器",
    description: "Anthropic 官方技能。帮 Agent 快速构建可交互的 Web 小工具/演示页面——独立 HTML/CSS/JS，无需框架，一键预览。",
    installCmd: "npx skills add anthropics/skills",
    tags: ["Skills.sh"],
    category: "创作",
    downloads: "15K",
  },
  {
    id: 180,
    emoji: "🐙",
    name: "Git Commit 规范",
    description: "GitHub 官方 awesome-copilot 技能。教 Agent 写出规范的 Git commit message——Conventional Commits、语义化版本、变更日志自动生成。",
    installCmd: "npx skills add github/awesome-copilot",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "15K",
  },
  {
    id: 181,
    emoji: "📑",
    name: "PRD 产品需求文档",
    description: "GitHub 官方 awesome-copilot 技能。帮 Agent 撰写专业的产品需求文档——用户故事、功能规格、验收标准、技术约束，10K+ 安装。",
    installCmd: "npx skills add github/awesome-copilot",
    tags: ["Skills.sh"],
    category: "办公",
    downloads: "10K",
  },
  {
    id: 182,
    emoji: "🔄",
    name: "代码重构（GitHub）",
    description: "GitHub 官方 awesome-copilot 技能。专注大规模代码重构——安全重命名、提取模块、接口重构、向后兼容，9.4K 安装。",
    installCmd: "npx skills add github/awesome-copilot",
    tags: ["Skills.sh"],
    category: "开发",
    downloads: "9.4K",
  },
  {
    id: 183,
    emoji: "📊",
    name: "Excalidraw 图表生成",
    description: "GitHub 官方 awesome-copilot 技能。帮 Agent 生成 Excalidraw 手绘风格图表——流程图、架构图、思维导图、序列图，9.4K 安装。",
    installCmd: "npx skills add github/awesome-copilot",
    tags: ["Skills.sh"],
    category: "设计",
    downloads: "9.4K",
  },
  {
    id: 184,
    emoji: "📝",
    name: "文档编写器（GitHub）",
    description: "GitHub 官方 awesome-copilot 技能。帮 Agent 写出优质技术文档——README、贡献指南、部署文档、API 参考，9.3K 安装。",
    installCmd: "npx skills add github/awesome-copilot",
    tags: ["Skills.sh"],
    category: "文档",
    downloads: "9.3K",
  },
  {
    id: 185,
    emoji: "📊",
    name: "分析追踪",
    description: "coreyhaines31 营销系列。帮 Agent 设置和优化数据分析追踪——GA4、Mixpanel、Posthog 事件埋点、转化漏斗、用户行为分析。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "20K",
  },
  {
    id: 186,
    emoji: "💌",
    name: "冷启动邮件",
    description: "coreyhaines31 营销系列。帮 Agent 写出高回复率的冷启动邮件——个性化开头、价值钩子、CTA 设计、跟进序列，11K+ 安装。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "11K",
  },
  {
    id: 187,
    emoji: "🛒",
    name: "免费工具获客策略",
    description: "coreyhaines31 营销系列。教 Agent 用免费工具驱动增长——计算器、检查器、生成器等小工具吸引流量，转化为付费用户，18K 安装。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "18K",
  },
  {
    id: 188,
    emoji: "🔁",
    name: "裂变推荐计划",
    description: "coreyhaines31 营销系列。帮 Agent 设计用户推荐计划——奖励机制、邀请链接、层级奖励、反作弊策略，18K 安装。",
    installCmd: "npx skills add coreyhaines31/marketingskills",
    tags: ["Skills.sh"],
    category: "营销",
    downloads: "18K",
  },
  {
    id: 189,
    emoji: "💎",
    name: "Sleek 移动端设计",
    description: "sleekdotdesign 出品的移动端设计技能。让 Agent 做出苹果级的移动端 UI——圆角、模糊效果、手势交互、流畅动画，18K 安装。",
    installCmd: "npx skills add sleekdotdesign/agent-skills",
    tags: ["Skills.sh"],
    category: "设计",
    downloads: "18K",
  },
  // Skills.sh 热门前100个技能
  ...skillsShTop100.map((skill, index) => ({
    ...skill,
    id: 190 + index, // 从190开始，避免ID冲突
    tags: skill.tags || ["Skills.sh"],
    downloads: skill.installs || "0",
  })),
];

const tagConfig: Record<string, { label: string; className: string }> = {
  必装: { label: "⭐ 必装", className: "bg-yellow-100 text-yellow-700" },
  热门: { label: "🔥 热门", className: "bg-orange-100 text-orange-600" },
  社区: { label: "社区", className: "bg-purple-50 text-purple-600" },
  "Skills.sh": { label: "🌐 Skills.sh", className: "bg-blue-100 text-blue-600" },
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
  const [activeFilter, setActiveFilter] = useState("全部");

  // 获取技能的24小时安装数
  const getTrending24h = (skillName: string, installCmd?: string): number => {
    // 从安装命令中提取技能名称（如果是 skills.sh 的技能）
    if (installCmd?.includes("skillsadd") || installCmd?.includes("skills add")) {
      const match = installCmd.match(/skills(?:add| add)\s+([^\s]+)/);
      if (match) {
        const repo = match[1].split("/").pop()?.toLowerCase();
        if (repo) {
          // 尝试精确匹配
          const exactMatch = Object.keys(skillsShTrending24h).find(
            (key) => key.toLowerCase() === repo
          );
          if (exactMatch) {
            return parseTrending24h(skillsShTrending24h[exactMatch]);
          }
          // 尝试部分匹配
          const partialMatch = Object.keys(skillsShTrending24h).find(
            (key) => key.toLowerCase().includes(repo) || repo.includes(key.toLowerCase())
          );
          if (partialMatch) {
            return parseTrending24h(skillsShTrending24h[partialMatch]);
          }
        }
      }
    }
    
    // 尝试直接匹配技能名称
    const nameLower = skillName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const trendingKey = Object.keys(skillsShTrending24h).find(
      (key) => {
        const keyLower = key.toLowerCase();
        return keyLower === nameLower || 
               nameLower.includes(keyLower) || 
               keyLower.includes(nameLower);
      }
    );
    if (trendingKey) {
      return parseTrending24h(skillsShTrending24h[trendingKey]);
    }
    return 0;
  };

  const filtered = useMemo(() => {
    let result = skills.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.includes(search);
      const matchFilter =
        activeFilter === "全部" ||
        (activeFilter === "必装" && s.tags.includes("必装")) ||
        (activeFilter === "热门" && s.tags.includes("热门")) ||
        (activeFilter === "Skills.sh" && s.tags.includes("Skills.sh"));
      return matchSearch && matchFilter;
    });

    // 如果选择"热门"，按24小时安装数排序（与 skills.sh/trending 保持一致）
    if (activeFilter === "热门") {
      result = [...result].sort((a, b) => {
        const aTrending = getTrending24h(a.name, a.installCmd);
        const bTrending = getTrending24h(b.name, b.installCmd);
        // 如果都有24小时数据，按24小时安装数降序
        if (aTrending > 0 && bTrending > 0) {
          return bTrending - aTrending;
        }
        // 如果只有一个有24小时数据，有数据的排在前面
        if (aTrending > 0) return -1;
        if (bTrending > 0) return 1;
        // 都没有24小时数据，按总安装数降序（如果有）
        const parseDownloads = (val: string | undefined): number => {
          if (!val) return 0;
          const num = parseFloat(val.replace(/[KM]/g, ""));
          return val.includes("K") ? num * 1000 : num;
        };
        const aDownloads = parseDownloads((a as any).downloads);
        const bDownloads = parseDownloads((b as any).downloads);
        return bDownloads - aDownloads;
      });
    }

    return result;
  }, [search, activeFilter]);

  const mustCount = skills.filter((s) => s.tags.includes("必装")).length;
  const hotCount = skills.filter((s) => s.tags.includes("热门")).length;
  const skillsShCount = skills.filter((s) => s.tags.includes("Skills.sh")).length;

  const [heroCopiedIdx, setHeroCopiedIdx] = useState<number | null>(null);

  const heroExamples = [
    { emoji: "🏗️", label: "多Agent团队", cmd: "clawhub install multi-agent-team" },
    { emoji: "🌐", label: "网页搜索",     cmd: "clawhub install web-search" },
    { emoji: "🖼️", label: "AI图片生成",  cmd: "clawhub install ai-image-gen" },
    { emoji: "🧑", label: "AI文本人性化", cmd: "clawhub install humanizer" },
  ];

  const heroCopyCmd = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd).then(() => {
      setHeroCopiedIdx(idx);
      setTimeout(() => setHeroCopiedIdx(null), 2000);
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50/40 to-white">

      {/* ——— 顶部大横幅 ——— */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 lg:py-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* 左侧文案 */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
              装上这个 <span className="text-blue-600">Skill，</span>
              <br />
              你的龙虾才算真正<span className="text-blue-600">开挂</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-md mx-auto lg:mx-0">
              精选推荐，高速下载体验，轻松查找 ClawHub 3.0 万个 AI Skills
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#skills-list"
                className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-200 text-center"
              >
                查看精选榜单
              </a>
              <button
                onClick={() => {
                  document.getElementById("skills-list")?.scrollIntoView({ behavior: "smooth" });
                  setActiveFilter("全部");
                }}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all text-center"
              >
                探索全部技能
              </button>
            </div>
          </div>

          {/* 右侧卡片 */}
          <div className="w-full max-w-sm lg:max-w-xs xl:max-w-sm shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-5 space-y-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">热门技能 · 一键复制安装命令</p>
              {heroExamples.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5"
                >
                  <span className="text-lg shrink-0">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-700 mb-0.5">{item.label}</div>
                    <code className="text-xs text-gray-400 truncate block">{item.cmd}</code>
                  </div>
                  <button
                    onClick={() => heroCopyCmd(item.cmd, idx)}
                    className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    {heroCopiedIdx === idx ? (
                      <><Check size={11} /> 已复制</>
                    ) : (
                      <><Copy size={11} /> 复制</>
                    )}
                  </button>
                </div>
              ))}
              <a
                href="#skills-list"
                className="block text-center text-xs text-indigo-500 hover:text-indigo-700 pt-1 transition-colors"
              >
                查看全部 {skills.length}+ 个技能 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section id="skills-list" className="max-w-5xl mx-auto px-4 pt-12 pb-8 text-center">
        <div className="text-8xl mb-4 select-none">🦞</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          龙虾技能包商店
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          装上技能，变身数字员工——你的龙虾，由你定义
        </p>

        {/* 统计 */}
        <div className="flex justify-center gap-8 sm:gap-10 mb-8">
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
          <div>
            <div className="text-2xl font-bold text-blue-600">{skillsShCount}</div>
            <div className="text-sm text-gray-400">🌐 Skills.sh</div>
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
            onClick={() => { setActiveFilter("全部"); }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
              activeFilter === "全部"
                ? "bg-indigo-600 text-white border-indigo-600 shadow"
                : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
            }`}
          >
            全部
          </button>

          {/* 快速筛选：必装 / 热门 / Skills.sh */}
          {[
            { key: "必装", label: "⭐ 必装" },
            { key: "热门", label: "🔥 热门" },
            { key: "Skills.sh", label: "🌐 Skills.sh" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => { setActiveFilter(f.key); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                activeFilter === f.key
                  ? "bg-indigo-600 text-white border-indigo-600 shadow"
                  : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
              }`}
            >
              {f.label}
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
              <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-1 line-clamp-3">
                {skill.description}
              </p>

              {/* 安装命令 */}
              <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 mb-3 flex items-center justify-between gap-2">
                <code className="text-xs text-gray-600 font-mono truncate flex-1">{skill.installCmd}</code>
                <CopyButton cmd={skill.installCmd} />
              </div>

              {/* 底部：标签 + 下载量 */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-1">
                  {skill.tags.map((tag: string) => (
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
                {(skill as any).downloads && (
                  <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                    ⬇ {(skill as any).downloads}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 底部说明 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 龙虾技能安装 */}
          <div className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-8">
            <div className="text-3xl mb-3">🦞</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              龙虾技能安装
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              先安装 ClawHub CLI，再用 <code className="bg-gray-100 px-1 rounded text-xs">clawhub install</code> 安装
            </p>
            <div className="flex flex-col gap-2 items-center">
              <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 inline-block font-mono text-sm text-gray-700">
                npm i -g clawhub
              </div>
              <div className="text-xs text-gray-400">然后执行</div>
              <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 inline-block font-mono text-sm text-gray-700">
                clawhub install &lt;skill-name&gt;
              </div>
            </div>
          </div>

          {/* Skills.sh 安装 */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Skills.sh 技能安装
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              无需安装 CLI，直接用 <code className="bg-gray-100 px-1 rounded text-xs">npx skills add</code> 一键安装
            </p>
            <div className="flex flex-col gap-2 items-center">
              <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 inline-block font-mono text-sm text-gray-700">
                npx skills add &lt;owner/repo&gt;
              </div>
              <div className="text-xs text-gray-400 mt-1">
                支持 Cursor / Claude Code / Windsurf / Copilot 等主流 AI Agent
              </div>
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
