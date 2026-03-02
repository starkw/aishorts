"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { signIn } from "next-auth/react";
import { X, User, Lock, Eye, EyeOff, Mail, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** 默认显示注册视图 */
  defaultView?: "login" | "register";
}

type Tab = "password" | "passwordless";
type View = "login" | "register" | "forgot" | "sent";

// Google SVG 图标
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function LoginModal({ isOpen, onClose, defaultView = "login" }: LoginModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Tab>("password");
  const [view, setView] = useState<View>(defaultView);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 表单字段
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ESC 关闭
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // 防止背景滚动
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // 重置状态
  useEffect(() => {
    if (isOpen) {
      setView(defaultView);
      setError("");
      setEmail("");
      setPassword("");
      setUsername("");
      setConfirmPassword("");
      setTab("password");
    }
  }, [isOpen, defaultView]);

  if (!isOpen || typeof document === "undefined") return null;

  // ── 密码登录提交 ──
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("请填写所有字段"); return; }
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("邮箱或密码错误，请重试");
      } else {
        onClose();
      }
    } catch {
      setError("登录失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  // ── 无密码登录提交 ──
  const handlePasswordlessLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("请输入邮箱地址"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("请输入有效的邮箱地址"); return; }
    setLoading(true);
    try {
      await signIn("email", { email, redirect: false });
      setView("sent");
    } catch {
      setError("发送失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  // ── 注册提交 ──
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !email || !password || !confirmPassword) { setError("请填写所有字段"); return; }
    if (password !== confirmPassword) { setError("两次密码不一致"); return; }
    if (password.length < 6) { setError("密码至少需要 6 位"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "注册失败，请稍后重试");
      } else {
        // 注册成功，自动登录
        const loginRes = await signIn("credentials", { email, password, redirect: false });
        if (loginRes?.error) {
          setView("login");
          setError("注册成功！请登录");
        } else {
          onClose();
        }
      }
    } catch {
      setError("注册失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  // ── 忘记密码提交 ──
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("请输入注册邮箱"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("请输入有效的邮箱地址"); return; }
    setLoading(true);
    try {
      // 通过无密码登录发送重置链接（复用 magic link 功能）
      await signIn("email", { email, redirect: false });
      setView("sent");
    } catch {
      setError("发送失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const modal = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* 弹窗主体 - 深色主题 */}
      <div className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="p-8">
          {/* ══════════ 邮件已发送视图 ══════════ */}
          {view === "sent" && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <Mail size={28} className="text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">邮件已发送</h2>
              <p className="text-gray-400 text-sm mb-6">
                我们已向 <span className="text-white font-medium">{email}</span> 发送了登录链接，请查收邮件并点击链接完成登录。
              </p>
              <button
                onClick={() => setView("login")}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                ← 返回登录
              </button>
            </div>
          )}

          {/* ══════════ 忘记密码视图 ══════════ */}
          {view === "forgot" && (
            <>
              <h2 className="text-2xl font-bold text-white mb-1">重置密码</h2>
              <p className="text-gray-400 text-sm mb-6">输入注册邮箱，我们将发送重置链接。</p>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <InputField
                  icon={<Mail size={16} />}
                  type="email"
                  placeholder="注册邮箱"
                  value={email}
                  onChange={setEmail}
                />
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <SubmitButton loading={loading} label="发送重置链接" />
              </form>
              <button
                onClick={() => { setView("login"); setError(""); }}
                className="mt-4 w-full text-center text-sm text-gray-500 hover:text-white transition-colors"
              >
                ← 返回登录
              </button>
            </>
          )}

          {/* ══════════ 注册视图 ══════════ */}
          {view === "register" && (
            <>
              <h2 className="text-2xl font-bold text-white mb-1">创建账号</h2>
              <p className="text-gray-400 text-sm mb-6">注册即可保存收藏、分享提示词。</p>
              <form onSubmit={handleRegister} className="space-y-3">
                <InputField
                  icon={<User size={16} />}
                  type="text"
                  placeholder="用户名"
                  value={username}
                  onChange={setUsername}
                />
                <InputField
                  icon={<Mail size={16} />}
                  type="email"
                  placeholder="电子邮件"
                  value={email}
                  onChange={setEmail}
                />
                <PasswordField
                  placeholder="密码（至少 6 位）"
                  value={password}
                  onChange={setPassword}
                  show={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
                <PasswordField
                  placeholder="确认密码"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  show={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <SubmitButton loading={loading} label="注册" />
              </form>
              <Divider />
              <GoogleButton />
              <p className="text-center text-sm text-gray-500 mt-5">
                已有账号？{" "}
                <button
                  onClick={() => { setView("login"); setError(""); }}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  登录
                </button>
              </p>
            </>
          )}

          {/* ══════════ 登录视图 ══════════ */}
          {view === "login" && (
            <>
              <h2 className="text-2xl font-bold text-white mb-1">欢迎回来</h2>
              <p className="text-gray-400 text-sm mb-6">登录即可查看更多高级提示。</p>

              <hr className="border-white/10 mb-6" />

              {/* Tab 切换 */}
              <div className="flex bg-black/40 rounded-xl p-1 mb-6">
                <TabButton active={tab === "password"} onClick={() => { setTab("password"); setError(""); }}>
                  密码登录
                </TabButton>
                <TabButton active={tab === "passwordless"} onClick={() => { setTab("passwordless"); setError(""); }}>
                  无密码登录
                </TabButton>
              </div>

              {/* ── 密码登录 ── */}
              {tab === "password" && (
                <form onSubmit={handlePasswordLogin} className="space-y-3">
                  <InputField
                    icon={<User size={16} />}
                    type="text"
                    placeholder="用户名/电子邮件"
                    value={email}
                    onChange={setEmail}
                    autoComplete="email"
                  />
                  <PasswordField
                    placeholder="密码"
                    value={password}
                    onChange={setPassword}
                    show={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => { setView("forgot"); setError(""); }}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      忘记密码
                    </button>
                  </div>
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <SubmitButton loading={loading} label="直接登录" />
                </form>
              )}

              {/* ── 无密码登录 ── */}
              {tab === "passwordless" && (
                <form onSubmit={handlePasswordlessLogin} className="space-y-3">
                  <InputField
                    icon={<Mail size={16} />}
                    type="email"
                    placeholder="输入你的电子邮件"
                    value={email}
                    onChange={setEmail}
                    autoComplete="email"
                  />
                  <p className="text-xs text-gray-500 leading-relaxed">
                    我们将向你的邮箱发送一个免密登录链接，点击即可完成登录。
                  </p>
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <SubmitButton loading={loading} label="发送登录链接" icon={<ArrowRight size={15} />} />
                </form>
              )}

              <Divider />
              <GoogleButton />

              <p className="text-center text-sm text-gray-500 mt-5">
                还没有账号？{" "}
                <button
                  onClick={() => { setView("register"); setError(""); }}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  注册
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

// ── 子组件 ──

function TabButton({ active, onClick, children }: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
        active
          ? "bg-[#222] text-white shadow"
          : "text-gray-500 hover:text-gray-300"
      )}
    >
      {children}
    </button>
  );
}

function InputField({ icon, type, placeholder, value, onChange, autoComplete }: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-3.5 text-gray-500 pointer-events-none">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
      />
    </div>
  );
}

function PasswordField({ placeholder, value, onChange, show, onToggle }: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-3.5 text-gray-500 pointer-events-none">
        <Lock size={16} />
      </span>
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="current-password"
        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3.5 text-gray-500 hover:text-gray-300 transition-colors"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

function SubmitButton({ loading, label, icon }: { loading: boolean; label: string; icon?: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors mt-1"
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : icon}
      {label}
    </button>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-white/10" />
      <span className="text-xs text-gray-500">或者</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

function GoogleButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="w-full flex items-center justify-center gap-2.5 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-colors"
    >
      <GoogleIcon />
      通过 Google 登录
    </button>
  );
}
