"use client";

import { useState } from "react";
import { Sparkles, Github, Heart, Share2, MessageSquare, Zap } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginModal from "./LoginModal";
import UserMenu from "./UserMenu";

export default function Header() {
  const { data: session, status } = useSession();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Shorts
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-indigo-600 transition-colors font-medium text-indigo-600"
            >
              全部提示词
            </Link>
            <Link
              href="/"
              className="hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <Heart size={14} />
              我的收藏
            </Link>
            <Link
              href="/feedback"
              className="hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <MessageSquare size={14} />
              反馈
            </Link>
            <Link
              href="/openclaw-skills"
              className="hover:text-orange-500 transition-colors flex items-center gap-1 font-medium text-orange-500"
            >
              🦞 OpenClaw Skills
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <Github size={14} />
              GitHub
            </a>
          </nav>

          {/* 右侧操作区 */}
          <div className="flex items-center gap-2">
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
          </div>
        </div>
      </header>

      {/* 登录弹窗 */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
