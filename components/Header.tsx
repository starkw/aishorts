"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/#generator", label: "开始创作" },
  { href: "/#templates", label: "模板库" },
  { href: "/#guide", label: "使用指南" },
  { href: "/#faq", label: "常见问题" },
];

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** 只有首页顶部才透明浮在深色 hero 上，其他页面与滚动后都用实底 */
  const overlay = isHome && !scrolled && !mobileNavOpen;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          overlay
            ? "bg-transparent"
            : "bg-white/85 backdrop-blur-md border-b border-gray-100"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-aperture.svg"
              alt="AI Shorts"
              width={28}
              height={28}
              className="block"
            />
            <span
              className={
                overlay
                  ? "text-white"
                  : "bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent"
              }
            >
              AI Shorts
            </span>
          </Link>

          <nav
            className={`hidden sm:flex items-center gap-6 text-sm transition-colors ${
              overlay ? "text-white/75" : "text-gray-600"
            }`}
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  overlay ? "hover:text-white" : "hover:text-amber-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/feedback"
              className={`flex items-center gap-1 transition-colors ${
                overlay ? "hover:text-white" : "hover:text-amber-600"
              }`}
            >
              <MessageSquare size={14} />
              反馈
            </Link>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/#generator"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-400 text-gray-900 text-sm font-medium rounded-lg hover:bg-amber-300 active:scale-95 transition-all"
            >
              <Sparkles size={13} />
              免费出图
            </Link>

            <button
              type="button"
              aria-label={mobileNavOpen ? "关闭菜单" : "打开菜单"}
              className={`sm:hidden p-2 rounded-lg transition-colors ${
                overlay
                  ? "text-white hover:bg-white/10"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setMobileNavOpen((o) => !o)}
            >
              {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1 text-sm text-gray-700">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2.5 px-2 rounded-lg hover:bg-gray-50"
                onClick={() => setMobileNavOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/feedback"
              className="py-2.5 px-2 rounded-lg flex items-center gap-2 hover:bg-gray-50"
              onClick={() => setMobileNavOpen(false)}
            >
              <MessageSquare size={16} />
              反馈
            </Link>
          </div>
        )}
      </header>

      {/* 顶栏改为 fixed 后脱离文档流，非首页需要补回它占的高度 */}
      {!isHome && <div className="h-14" aria-hidden />}
    </>
  );
}
