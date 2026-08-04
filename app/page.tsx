import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";
import GeneratorPanel from "@/components/generator/GeneratorPanel";
import TemplateShowcase from "@/components/sections/TemplateShowcase";
import WhyUs from "@/components/sections/WhyUs";
import HowItWorks from "@/components/sections/HowItWorks";
import PromptGuide from "@/components/sections/PromptGuide";
import Faq from "@/components/sections/Faq";
import SiteFooter from "@/components/sections/SiteFooter";
import { templates } from "@/data/templates";

const HIGHLIGHTS = [
  "不用注册，打开就能用",
  "不用信用卡，没有订阅",
  "输出不加水印",
  "文生图 + 图生图",
  "图片只存在你的浏览器",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/40 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-10 text-center">
          <div className="inline-flex items-center gap-1.5 bg-white/80 border border-indigo-100 text-indigo-600 text-xs font-medium px-3 py-1.5 rounded-full mb-6 shadow-sm">
            ✦ 免费 AI 图像生成
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
            一句话，
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              直接出图
            </span>
          </h1>

          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto mb-7 leading-relaxed">
            不用注册、不用付费、不用自己的 API Key。
            <br className="hidden sm:block" />
            打开网页写一句描述，剩下的交给模型。
          </p>

          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-10">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-1.5 text-sm text-gray-600">
                <CheckCircle2 size={14} className="text-emerald-500" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 生成器 */}
      <section id="generator" className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 mb-16 relative z-10">
        <Suspense
          fallback={
            <div className="h-96 rounded-3xl border border-gray-200 bg-white animate-pulse" />
          }
        >
          <GeneratorPanel />
        </Suspense>
      </section>

      <WhyUs />
      <HowItWorks />
      <TemplateShowcase />

      <div id="guide">
        <PromptGuide />
      </div>

      <Faq />
      <SiteFooter />
    </main>
  );
}

export const metadata = {
  title: "免费 AI 图像生成 — 不用注册，不用付费 | AI Shorts",
  description: `打开就能用的免费 AI 出图工具。支持文生图与图生图，${templates.length} 个现成模板，输出不加水印，图片只存在你的浏览器里。不需要 ChatGPT 账号，不需要信用卡。`,
};
