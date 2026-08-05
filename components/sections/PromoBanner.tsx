import { ArrowRight, Gauge, Globe, Layers, Zap } from "lucide-react";

const PERKS = [
  { icon: Zap, label: "无需等待排队" },
  { icon: Gauge, label: "更高每日额度" },
  { icon: Layers, label: "多种模型可选" },
  { icon: Globe, label: "全平台可用" },
];

export default function PromoBanner() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="relative rounded-2xl bg-gray-900 overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bg/banner.jpg" alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/75 to-gray-950/35" />
        </div>

        <div className="relative px-6 sm:px-10 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div className="flex-1">
              <p className="text-[11px] font-semibold tracking-widest text-amber-300 uppercase mb-2.5">
                想要更多能力
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                不排队，不限区，多模型任选
              </h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-xl">
                免费版靠广告覆盖生成成本，所以设了每日额度和冷却。
                如果你需要批量出图、更高清晰度或者更多模型，欢迎反馈需求，
                我们会考虑推出进阶方案。
              </p>
            </div>

            <a
              href="/feedback"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold transition-colors"
            >
              提交需求
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PERKS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-white/60">
                <Icon size={14} className="text-amber-400 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
