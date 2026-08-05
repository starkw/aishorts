import { CreditCard, Languages, ShieldCheck, Sparkles, UserX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

function Num({ n, tone = "light" }: { n: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={`text-[11px] font-mono tabular-nums ${
        tone === "dark" ? "text-white/40" : "text-gray-300"
      }`}
    >
      {n}
    </span>
  );
}

function Chip({ icon: Icon, tone = "light" }: { icon: LucideIcon; tone?: "light" | "dark" }) {
  return (
    <span
      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
        tone === "dark"
          ? "bg-white/10 backdrop-blur-sm ring-1 ring-white/15"
          : "bg-amber-50 ring-1 ring-amber-100"
      }`}
    >
      <Icon size={17} className={tone === "dark" ? "text-amber-300" : "text-amber-600"} />
    </span>
  );
}

const CARD = "rounded-3xl overflow-hidden ring-1 ring-black/5";
const IMG = "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]";

export default function WhyUs() {
  return (
    <section id="why" className="bg-gray-50 border-y border-gray-100 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          为什么用 AI Shorts
        </h2>
        <p className="text-gray-500 mt-3 mb-8 sm:mb-10">
          把出图这件事的门槛降到最低：打开就能用
        </p>

        <div className="space-y-4">
          {/* 上排：左侧大图卡压场，右侧两张小卡 */}
          <div className="grid gap-4 lg:grid-cols-3">
            <div className={`${CARD} group relative lg:col-span-2 min-h-[320px] lg:min-h-[400px] bg-gray-950`}>
              <img src="/bg/why-open.jpg" alt="" className={IMG} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent" />
              <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Chip icon={UserX} tone="dark" />
                  <Num n="01" tone="dark" />
                </div>
                <div className="max-w-md">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    没有账号，就没有门槛
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed mt-3">
                    没有邮箱、没有手机号、没有第三方登录。打开网页直接开始生成，我们也不需要知道你是谁。
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className={`${CARD} bg-gradient-to-br from-amber-50 to-orange-50 ring-amber-100 p-6 flex flex-col justify-between`}>
                <div className="flex items-start justify-between">
                  <span className="text-5xl font-black text-amber-500 tracking-tighter leading-none">
                    ¥0
                  </span>
                  <Num n="02" />
                </div>
                <div className="mt-6">
                  <h3 className="text-base font-semibold text-gray-900">一分钱都不收</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1.5">
                    站点靠广告养生成成本，不收信用卡、不做订阅、不设付费墙。
                  </p>
                </div>
              </div>

              <div className={`${CARD} bg-white p-6 flex flex-col justify-between`}>
                <div className="flex items-start justify-between">
                  <Chip icon={ShieldCheck} />
                  <Num n="03" />
                </div>
                <div className="mt-6">
                  <h3 className="text-base font-semibold text-gray-900">输出不加水印</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mt-1.5">
                    不打站点 logo、不加边框、不留标识，交给你的就是模型的原始输出。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 下排：终端卡 + 图片卡 */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className={`${CARD} bg-gray-950 ring-gray-800 flex flex-col`}>
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-800">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-1.5 text-[10px] font-mono text-gray-500 truncate">
                  ~/你的浏览器/indexeddb
                </span>
                <span className="ml-auto pl-2">
                  <Num n="04" tone="dark" />
                </span>
              </div>
              <div className="flex-1 flex items-center gap-5 p-6">
                <img
                  src="/bg/why-chip.jpg"
                  alt=""
                  className="hidden sm:block w-24 h-24 rounded-2xl object-cover ring-1 ring-white/10 shrink-0"
                />
                <div>
                  <h3 className="text-base font-semibold text-white">图片只留在你本机</h3>
                  <p className="text-xs font-mono text-gray-400 leading-relaxed mt-2">
                    <span className="text-amber-400">$ </span>
                    生成结果以二进制存进浏览器 IndexedDB，不经过我们的服务器，你随时可以自己清空。
                  </p>
                </div>
              </div>
            </div>

            <div className={`${CARD} group relative min-h-[220px] bg-gray-950`}>
              <img src="/bg/why-prism.jpg" alt="" className={IMG} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/25" />
              <div className="relative h-full flex flex-col justify-between p-6">
                <div className="flex items-center gap-3">
                  <Chip icon={Sparkles} tone="dark" />
                  <Num n="05" tone="dark" />
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white">文生图 + 图生图</h3>
                  <p className="text-sm text-white/70 leading-relaxed mt-1.5">
                    既能凭一句描述生成，也能上传参考图做换背景、改风格、修老照片这类精细编辑。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 收尾窄条 */}
          <div className={`${CARD} bg-white p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6`}>
            <Chip icon={Languages} />
            <div className="sm:flex-1">
              <h3 className="text-base font-semibold text-gray-900">中文直接可用</h3>
              <p className="text-sm text-gray-500 leading-relaxed mt-1">
                用中文写提示词就行，系统会在送给模型前处理好语言差异，不用你先翻译成英文。
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <CreditCard size={15} className="text-gray-300" />
              <Num n="06" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
