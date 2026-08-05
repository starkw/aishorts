import Link from "next/link";

const COLUMNS: Array<{ title: string; items: Array<{ label: string; href: string }> }> = [
  {
    title: "产品",
    items: [
      { label: "开始创作", href: "/#generator" },
      { label: "模板库", href: "/#templates" },
      { label: "常见问题", href: "/#faq" },
    ],
  },
  {
    title: "使用",
    items: [
      { label: "提示词指南", href: "/#guide" },
      { label: "实战小抄", href: "/#cheatsheet" },
      { label: "模型参考", href: "/#models" },
    ],
  },
  {
    title: "关于",
    items: [{ label: "意见反馈", href: "/feedback" }],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-aperture.svg"
                alt="AI Shorts"
                width={26}
                height={26}
                className="block"
              />
              <span className="font-bold text-gray-900">AI Shorts</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              免费 AI 图像生成。不用账号，不用付费。
            </p>
          </div>

          {COLUMNS.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-3">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-amber-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} AI Shorts — 免费 AI 图像生成</span>
          <span>生成结果的版权与合规请遵循对应模型服务商的使用政策</span>
        </div>
      </div>
    </footer>
  );
}
