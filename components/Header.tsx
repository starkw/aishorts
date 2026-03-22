"use client";

import { useState } from "react";
import { Share2, MessageSquare, Book, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginModal from "./LoginModal";
import UserMenu from "./UserMenu";

const navLinkClass = (active: boolean) =>
  `transition-colors flex items-center gap-1 ${
    active ? "text-indigo-600 font-medium" : "hover:text-indigo-600"
  }`;

export default function Header() {
  const { data: session, status } = useSession();
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 shrink-0">
            <img src="/logo-v1.svg" alt="AI Shorts" width={30} height={30} />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Shorts
            </span>
          </Link>

          {/* Nav — 文档入口（无 GitHub 顶栏） */}
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/" className={navLinkClass(pathname === "/")}>
              全部提示词
            </Link>
            <Link href="/openclaw-skills" className={navLinkClass(pathname === "/openclaw-skills")}>
              🦞 OpenClaw Skills
            </Link>
            <Link href="/feedback" className={navLinkClass(pathname === "/feedback")}>
              <MessageSquare size={14} />
              反馈
            </Link>
            <Link href="/docs" className={navLinkClass(pathname === "/docs")}>
              <Book size={14} />
              文档
            </Link>
          </nav>

          {/* 右侧操作区 */}
          <div className="flex items-center gap-2 shrink-0">
            {status === "authenticated" && session ? (
              // 已登录：显示分享按钮 + 用户菜单
              <>
                <button className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-indigo-50">
                  <Share2 size={14} />
                  分享提示词
                </button>
                <UserMenu session={session} />
              </>
            ) : (
              // 未登录 / 加载中：显示登录按钮
              <>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="hidden sm:block text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  分享提示词
                </button>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 active:scale-95 transition-all"
                >
                  登录
                </button>
              </>
            )}

            {/* 移动端：菜单（含 文档，替代旧版顶栏 GitHub） */}
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
            <Link
              href="/"
              className={`py-2.5 px-2 rounded-lg ${pathname === "/" ? "bg-indigo-50 text-indigo-700 font-medium" : "hover:bg-gray-50"}`}
              onClick={() => setMobileNavOpen(false)}
            >
              全部提示词
            </Link>
            <Link
              href="/openclaw-skills"
              className={`py-2.5 px-2 rounded-lg ${pathname === "/openclaw-skills" ? "bg-indigo-50 text-indigo-700 font-medium" : "hover:bg-gray-50"}`}
              onClick={() => setMobileNavOpen(false)}
            >
              🦞 OpenClaw Skills
            </Link>
            <Link
              href="/feedback"
              className={`py-2.5 px-2 rounded-lg flex items-center gap-2 ${pathname === "/feedback" ? "bg-indigo-50 text-indigo-700 font-medium" : "hover:bg-gray-50"}`}
              onClick={() => setMobileNavOpen(false)}
            >
              <MessageSquare size={16} />
              反馈
            </Link>
            <Link
              href="/docs"
              className={`py-2.5 px-2 rounded-lg flex items-center gap-2 ${pathname === "/docs" ? "bg-indigo-50 text-indigo-700 font-medium" : "hover:bg-gray-50"}`}
              onClick={() => setMobileNavOpen(false)}
            >
              <Book size={16} />
              文档
            </Link>
          </div>
        )}
      </header>

      {/* 登录弹窗 */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
