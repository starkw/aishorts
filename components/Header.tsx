"use client";

import { useState } from "react";
import { MessageSquare, Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";

const NAV = [
  { href: "/#generator", label: "开始创作" },
  { href: "/#templates", label: "模板库" },
  { href: "/#guide", label: "使用指南" },
  { href: "/#faq", label: "常见问题" },
];

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-1 font-bold text-lg text-gray-900 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-lobster.png"
            alt="AI Shorts"
            width={30}
            height={30}
            className="object-contain block -translate-y-1"
          />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI Shorts
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-indigo-600 transition-colors">
              {item.label}
            </Link>
          ))}
          <Link
            href="/feedback"
            className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
          >
            <MessageSquare size={14} />
            反馈
          </Link>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/#generator"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 active:scale-95 transition-all"
          >
            <Sparkles size={13} />
            免费出图
          </Link>

          <button
            type="button"
            aria-label={mobileNavOpen ? "关闭菜单" : "打开菜单"}
            className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
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
  );
}
