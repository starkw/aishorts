import { Check, Code2, Share2 } from "lucide-react";
import GeneratorPanel from "@/components/generator/GeneratorPanel";
import { templates } from "@/data/templates";

const PERKS = [
  "不需要 ChatGPT 账号",
  "不用注册、不用登录、不留邮箱",
  "不用信用卡、没有订阅",
  "生成的图片不加水印",
  "支持文生图与图生图",
  "图片只留在你的浏览器里",
];

export default function HeroWithGenerator() {
  return (
    <section className="relative bg-black overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bg/hero.jpg"
          alt=""
          className="w-full h-full object-cover opacity-90"
          fetchPriority="high"
        />
        {/* 左重右轻：文案侧压暗保证可读，右侧留出背景图本身 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        {/* 窄屏没有左右分栏，横向渐变托不住文字，额外均匀压一层 */}
        <div className="absolute inset-0 bg-black/45 lg:hidden" />
        {/* 顶部单独压一层，托住透明顶栏里的白色导航 */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-12 items-start">
          {/* 左：文案 */}
          <div className="text-white">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium text-amber-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              由 AI 图像模型驱动
            </div>

            <h1 className="text-4xl sm:text-5xl font-black leading-[1.1] mb-4">
              免费 AI 图像生成
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-white/90 leading-snug mb-5">
              不用登录，不用注册，
              <br />
              不用信用卡。
            </p>

            <p className="text-sm text-white/75 leading-relaxed mb-7">
              目前最省事的出图方式：打开网页，写一句描述，点生成。
              完全免费，除了每日合理额度之外没有其他限制。
            </p>

            <ul className="space-y-2.5 mb-8">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-white/90">
                  <Check size={14} className="text-amber-400 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 mb-5">
              <p className="text-xs text-white/75 leading-relaxed">
                在做网站、博客或者社群？把 AI Shorts 分享出去，
                你的读者不用离开自己的页面就能出图。也可以直接把链接发到
                微信群、小红书、即刻。
              </p>
            </div>

            <div className="flex gap-2.5">
              <a
                href="#templates"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-medium text-white transition-colors"
              >
                <Share2 size={13} />
                浏览 {templates.length} 个模板
              </a>
              <a
                href="#guide"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-medium text-white transition-colors"
              >
                <Code2 size={13} />
                使用指南
              </a>
            </div>
          </div>

          {/* 右：生成器 */}
          <div id="generator" className="lg:sticky lg:top-20">
            <GeneratorPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
