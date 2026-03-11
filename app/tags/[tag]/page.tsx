import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TAGS, type Tag } from "@/data/prompts";
import TagPageClient from "./TagPageClient";

// 每个分类的 SEO 专属描述
const TAG_SEO: Record<string, { title: string; description: string; keywords: string }> = {
  OpenClaw: {
    title: "OpenClaw龙虾AI提示词大全 - 最热门的AI Agent自动化指令",
    description: "精选20+条OpenClaw龙虾AI提示词，涵盖自动抢票、自动发周报、自动清理邮件、自动监控股票等热门场景。复制即用，让龙虾AI帮你自动完成重复性工作。",
    keywords: "OpenClaw提示词,龙虾AI,AI Agent,自动化,龙虾AI怎么用,OpenClaw技能,AI智能体",
  },
  电商产品: {
    title: "电商产品AI提示词 - 商品溶图/海报设计/选品分析",
    description: "精选电商运营必备AI提示词，包括商品溶图、海报设计、竞品分析、商品详情页文案、价格策略等实用场景。帮助电商卖家用AI提升运营效率。",
    keywords: "电商AI提示词,商品溶图,海报设计,商品详情页,选品分析,电商运营AI",
  },
  写作辅助: {
    title: "AI写作提示词大全 - 文章写作/内容创作指令",
    description: "精选高质量AI写作提示词，覆盖博客文章、社媒文案、故事创作、文章润色、创意写作等场景。复制即用，让ChatGPT/DeepSeek帮你快速产出优质内容。",
    keywords: "AI写作提示词,ChatGPT写作,文章生成,内容创作AI,写作助手提示词",
  },
  文章报告: {
    title: "AI文章报告提示词 - 自动生成报告/分析文档",
    description: "专业AI文章报告提示词，适用于工作总结、行业分析报告、学术论文摘要、市场调研报告等场景。提升工作文档效率50%以上。",
    keywords: "AI报告生成,工作总结AI,分析报告提示词,文档写作AI,报告模板",
  },
  编程开发: {
    title: "编程开发AI提示词 - 代码生成/Debug/架构设计",
    description: "精选编程开发AI提示词，涵盖代码生成、Bug调试、代码重构、技术方案设计、API设计等场景。适配ChatGPT、GitHub Copilot、DeepSeek等AI编程工具。",
    keywords: "编程AI提示词,代码生成,ChatGPT编程,GitHub Copilot,Debug提示词,代码优化",
  },
  AI工具: {
    title: "AI工具使用提示词 - 提升AI工具使用效率",
    description: "专业AI工具使用技巧提示词，帮助你更高效地使用ChatGPT、DeepSeek、Midjourney、Stable Diffusion等主流AI工具，解锁隐藏功能。",
    keywords: "AI工具提示词,ChatGPT技巧,DeepSeek使用,Midjourney提示词,AI使用技巧",
  },
  生活助手: {
    title: "生活助手AI提示词 - 日常生活/健康/旅行规划",
    description: "实用生活类AI提示词，包括旅行规划、食谱推荐、健康建议、家居整理、个人理财等日常生活场景，让AI成为你贴心的生活助手。",
    keywords: "生活AI助手,旅行规划AI,健康建议AI,日常生活提示词,智能生活助手",
  },
  趣味娱乐: {
    title: "趣味娱乐AI提示词 - 游戏/创意/脑洞玩法",
    description: "有趣的AI娱乐提示词合集，包括角色扮演、创意游戏、脑洞故事、搞笑对话、互动娱乐等玩法，让AI成为你的娱乐伙伴。",
    keywords: "AI娱乐提示词,角色扮演AI,AI游戏,创意AI玩法,趣味提示词",
  },
  心理社交: {
    title: "心理社交AI提示词 - 情感支持/沟通技巧/人际关系",
    description: "专业心理社交AI提示词，涵盖情感倾诉、沟通技巧提升、人际关系建议、心理疏导等场景，让AI成为你的情感支持伙伴。",
    keywords: "心理AI提示词,情感支持AI,沟通技巧,人际关系AI,心理健康提示词",
  },
  教育学习: {
    title: "教育学习AI提示词 - 学习方法/知识讲解/备考辅导",
    description: "高效学习AI提示词，包括知识点讲解、学习计划制定、考试备考、语言学习、技能提升等教育场景。让AI成为你的私人家教。",
    keywords: "教育AI提示词,学习助手AI,AI家教,知识讲解,备考AI,学习方法",
  },
  语言翻译: {
    title: "语言翻译AI提示词 - 专业翻译/多语言/本地化",
    description: "专业语言翻译AI提示词，支持中英日韩法德等多语言翻译，涵盖商务翻译、文学翻译、专业术语翻译、本地化适配等场景。",
    keywords: "AI翻译提示词,中英翻译AI,专业翻译,多语言AI,翻译技巧,本地化翻译",
  },
  SEO营销: {
    title: "SEO营销AI提示词 - 关键词优化/内容营销/广告文案",
    description: "专业SEO营销AI提示词，涵盖关键词研究、SEO文章生成、广告文案创作、社媒营销内容、邮件营销等场景，帮助提升网站流量和转化率。",
    keywords: "SEO提示词,营销AI,广告文案AI,内容营销,关键词优化AI,社媒营销提示词",
  },
  医疗健康: {
    title: "医疗健康AI提示词 - 健康咨询/养生建议/医学知识",
    description: "医疗健康类AI提示词，包括健康咨询、症状分析、养生建议、营养搭配、运动计划等场景。提供健康参考，助你科学管理健康。",
    keywords: "健康AI提示词,医疗咨询AI,养生AI,营养建议,健康管理AI,医学知识",
  },
  金融理财: {
    title: "金融理财AI提示词 - 投资分析/理财规划/股市分析",
    description: "专业金融理财AI提示词，涵盖投资分析、个人理财规划、股市解读、基金研究、财务规划等场景，让AI成为你的智能理财顾问。",
    keywords: "理财AI提示词,投资分析AI,股市AI,基金分析,财务规划AI,金融提示词",
  },
  音乐艺术: {
    title: "音乐艺术AI提示词 - 创作灵感/歌词生成/艺术设计",
    description: "创意音乐艺术AI提示词，包括歌词创作、旋律灵感、艺术设计构思、绘画描述、创意脚本等场景，激发你的艺术创造力。",
    keywords: "音乐AI提示词,歌词生成AI,艺术创作AI,绘画提示词,创意AI,设计灵感",
  },
  专业咨询: {
    title: "专业咨询AI提示词 - 法律/财务/职业规划咨询",
    description: "专业领域AI咨询提示词，涵盖法律问题解答、财务咨询、职业规划、创业建议、管理咨询等专业场景，获取AI专家级意见。",
    keywords: "专业咨询AI,法律AI咨询,财务建议AI,职业规划AI,创业咨询,管理顾问AI",
  },
  效率工具: {
    title: "效率工具AI提示词 - 时间管理/流程优化/自动化",
    description: "提升工作效率的AI提示词，包括时间管理、工作流程优化、任务规划、会议总结、效率提升等场景，让AI帮你每天多出2小时。",
    keywords: "效率AI提示词,时间管理AI,工作流程优化,任务规划AI,自动化提示词,效率工具",
  },
  职场商务: {
    title: "职场商务AI提示词 - 商务写作/职场沟通/汇报演示",
    description: "职场必备AI提示词，涵盖商务邮件撰写、工作汇报、会议纪要、演示文稿、职场沟通技巧等场景，让你在职场中脱颖而出。",
    keywords: "职场AI提示词,商务写作AI,工作汇报AI,商务邮件,PPT生成AI,职场技能",
  },
};

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag) as Tag;
  const seo = TAG_SEO[decodedTag];

  if (!seo) {
    return {
      title: `${decodedTag} AI提示词 | AI Shorts`,
      description: `精选${decodedTag}分类AI提示词，复制即用，提升AI使用效率。`,
    };
  }

  return {
    title: `${seo.title} | AI Shorts`,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.aishorts.top/tags/${tag}`,
      siteName: "AI Shorts",
      locale: "zh_CN",
      type: "website",
    },
    alternates: {
      canonical: `https://www.aishorts.top/tags/${tag}`,
    },
  };
}

export function generateStaticParams() {
  return TAGS.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag) as Tag;

  if (!TAGS.includes(decodedTag)) {
    notFound();
  }

  const seo = TAG_SEO[decodedTag];

  return (
    <>
      {/* 结构化数据 JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: seo?.title ?? `${decodedTag} AI提示词`,
            description: seo?.description ?? `精选${decodedTag}分类AI提示词`,
            url: `https://www.aishorts.top/tags/${tag}`,
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "首页", item: "https://www.aishorts.top" },
                { "@type": "ListItem", position: 2, name: decodedTag, item: `https://www.aishorts.top/tags/${tag}` },
              ],
            },
          }),
        }}
      />
      <TagPageClient initialTag={decodedTag} />
    </>
  );
}
