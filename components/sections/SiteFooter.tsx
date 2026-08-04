import Link from "next/link";

const LINKS: Array<{ title: string; items: Array<{ label: string; href: string }> }> = [
  {
    title: "产品",
    items: [
      { label: "开始创作", href: "/#generator" },
      { label: "模板库", href: "/#templates" },
      { label: "常见问题", href: "/#faq" },
    ],
  },
  {
    title: "关于",
    items: [
      { label: "使用指南", href: "/#guide" },
      { label: "意见反馈", href: "/feedback" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          <div className="md:max-w-xs">
            <div className="flex items-center gap-1 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-lobster.png" alt="AI Shorts" width={28} height={28} className="object-contain" />
              <span className="font-bold text-gray-900">AI Shorts</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              免费 AI 出图工具。不用注册，不用付费，图片只存在你自己的浏览器里。
            </p>
          </div>

          <div className="flex gap-16">
            {LINKS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-3">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} AI Shorts · 免费 AI 图像生成</span>
          <span>生成结果版权归属请遵循对应模型服务商的使用政策</span>
        </div>
      </div>
    </footer>
  );
}
