import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { auth } from "@/auth";

const geist = Geist({
  subsets: ["latin"],
});

const siteUrl = "https://www.aishorts.top";

export const metadata: Metadata = {
  title: {
    default: "AI Shorts - 精选 AI 提示词库 | ChatGPT 提示词大全",
    template: "%s | AI Shorts",
  },
  description:
    "AI Shorts 收录 278+ 精选高质量 AI 提示词，涵盖写作、编程、营销、翻译等16个分类，一键复制，立刻提升你的 ChatGPT、Claude、Gemini 使用效率。",
  keywords: [
    "AI提示词",
    "ChatGPT提示词",
    "Prompt",
    "提示词大全",
    "ChatGPT技巧",
    "AI工具",
    "Claude提示词",
    "提示词模板",
    "AI写作",
    "AI编程",
  ],
  authors: [{ name: "AI Shorts", url: siteUrl }],
  creator: "AI Shorts",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "AI Shorts",
    title: "AI Shorts - 精选 AI 提示词库 | ChatGPT 提示词大全",
    description:
      "278+ 精选 AI 提示词，涵盖写作、编程、营销、翻译等16个分类，一键复制，立刻提升你的 ChatGPT 使用效率。",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AI Shorts - 精选 AI 提示词库",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Shorts - 精选 AI 提示词库",
    description: "278+ 精选 AI 提示词，一键复制，立刻提升你的 ChatGPT 使用效率。",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", // 后续在 Google Search Console 获取
    // baidu: "your-baidu-verification-code",   // 后续在百度站长工具获取
  },
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
