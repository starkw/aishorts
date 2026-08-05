import { Suspense } from "react";
import HeroWithGenerator from "@/components/sections/HeroWithGenerator";
import PromoBanner from "@/components/sections/PromoBanner";
import ModelBoard from "@/components/sections/ModelBoard";
import TemplateShowcase from "@/components/sections/TemplateShowcase";
import WhyUs from "@/components/sections/WhyUs";
import HowItWorks from "@/components/sections/HowItWorks";
import PromptGuide from "@/components/sections/PromptGuide";
import ResourceCards from "@/components/sections/ResourceCards";
import Faq from "@/components/sections/Faq";
import SiteFooter from "@/components/sections/SiteFooter";
import { templates } from "@/data/templates";

export const metadata = {
  title: "免费 AI 图像生成 — 不用注册，不用付费 | AI Shorts",
  description: `打开就能用的免费 AI 出图工具。支持文生图与图生图，${templates.length} 个现成模板，输出不加水印，图片只存在你的浏览器里。不需要 ChatGPT 账号，不需要信用卡。`,
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="h-[720px] bg-gray-950" />}>
        <HeroWithGenerator />
      </Suspense>

      <PromoBanner />

      <div id="models">
        <ModelBoard />
      </div>

      <TemplateShowcase />
      <WhyUs />
      <HowItWorks />

      <div id="guide">
        <PromptGuide />
      </div>

      <div id="cheatsheet">
        <ResourceCards />
      </div>

      <Faq />
      <SiteFooter />
    </main>
  );
}
