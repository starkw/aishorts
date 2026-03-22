import { Metadata } from "next";
import { Book } from "lucide-react";
import { DocsPageSections } from "@/components/docs/DocsPageSections";

export const metadata: Metadata = {
  title: "文档 - Skills 使用指南 | AI Shorts",
  description:
    "概述、命令行界面与常见问题：如何发现、安装和使用 Skills。内容参考 skills.sh 官方文档。",
};

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-12">
        <div className="mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            <Book size={12} />
            文档
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Skills 使用指南</h1>
          <p className="text-gray-600 max-w-2xl">
            按「概述 → 命令行 → 常见问题」查阅：如何理解 Skills、如何用命令行安装，以及常见疑问。
          </p>
        </div>

        <DocsPageSections />
      </div>
    </main>
  );
}
