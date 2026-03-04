import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "用户反馈",
  description: "欢迎向 AI Shorts 提交功能建议、Bug 反馈或优质提示词，我们认真阅读每一条反馈。",
  alternates: {
    canonical: "https://www.aishorts.top/feedback",
  },
  openGraph: {
    title: "用户反馈 | AI Shorts",
    description: "欢迎向 AI Shorts 提交功能建议、Bug 反馈或优质提示词。",
    url: "https://www.aishorts.top/feedback",
  },
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
