import { CreditCard, HardDrive, Languages, ShieldCheck, Sparkles, UserX } from "lucide-react";

const REASONS = [
  {
    icon: UserX,
    title: "不用注册",
    body: "没有邮箱、没有手机号、没有第三方登录。打开网页直接用，我们也不需要知道你是谁。",
  },
  {
    icon: CreditCard,
    title: "不用付钱",
    body: "站点靠广告养生成成本，不收信用卡、不做订阅、不设付费墙。",
  },
  {
    icon: HardDrive,
    title: "图片留在你本机",
    body: "生成结果以二进制存进浏览器 IndexedDB，不上传我们服务器，随时可以自己清空。",
  },
  {
    icon: ShieldCheck,
    title: "输出不加水印",
    body: "不打站点 logo、不加边框、不留标识，交给你的就是模型的原始输出。",
  },
  {
    icon: Sparkles,
    title: "文生图 + 图生图",
    body: "既能凭一句描述生成，也能上传参考图做换背景、改风格、修老照片这类精细编辑。",
  },
  {
    icon: Languages,
    title: "中文直接可用",
    body: "用中文写提示词就行，系统会在送给模型前处理好语言差异，不用你先翻译成英文。",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
          为什么用 AI Shorts
        </h2>
        <p className="text-gray-500 text-center mb-12">
          把出图这件事的门槛降到最低：打开就能用
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REASONS.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-amber-200 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Icon size={18} className="text-amber-600" />
                </div>
                <span className="text-xs font-mono text-gray-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
