import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { auth } from "@/auth";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Shorts - 精选 AI 提示词库",
  description: "精选高质量 AI 提示词，一键复制，立刻提升你的 ChatGPT、Claude 使用效率",
  keywords: "AI提示词, ChatGPT, Claude, Prompt, 提示词库",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="zh-CN">
      <body className={`${geist.className} antialiased`}>
        <Providers session={session}>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
