import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { auth } from "@/auth";
import { Analytics } from "@vercel/analytics/react";

const siteUrl = "https://www.aishorts.top";

export const metadata: Metadata = {
  title: {
    default: "AI Shorts - 免费 AI 图像生成 | 不用注册，不用付费",
    template: "%s | AI Shorts",
  },
  description:
    "打开就能用的免费 AI 出图工具。支持文生图与图生图，64 个现成模板，输出不加水印，图片只存在你的浏览器里。不需要 ChatGPT 账号，不需要信用卡。",
  keywords: [
    "免费AI绘画",
    "AI图像生成",
    "免费文生图",
    "AI画图工具",
    "图生图",
    "在线AI绘图",
    "免注册AI绘画",
    "AI生成图片",
    "AI头像生成",
    "商品图生成",
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
    title: "AI Shorts - 免费 AI 图像生成 | 不用注册，不用付费",
    description:
      "打开就能用的免费 AI 出图工具，支持文生图与图生图，输出不加水印，图片只存在你的浏览器里。",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AI Shorts - 免费 AI 图像生成",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Shorts - 免费 AI 图像生成",
    description: "不用注册、不用付费的 AI 出图工具，支持文生图与图生图，输出不加水印。",
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
    google: "OdIVUVkWoVxWz9JvGPYign8FQfQNwfH8uOCykDTBieY",
  },
  icons: {
    icon: [
      { url: "/logo-mark.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/logo-mark-180.png",
    shortcut: "/favicon.png",
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
      <body className="antialiased">
        <Providers session={session}>
          <Header />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
