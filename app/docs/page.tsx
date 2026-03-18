import { Metadata } from "next";
import Link from "next/link";
import { Book, Code, TrendingUp, Shield, Search, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "文档 - Skills 使用指南 | AI Shorts",
  description: "了解如何发现、安装和使用 Skills 来增强你的 AI Agent 能力。",
};

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            <Book size={12} />
            文档
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Skills 文档</h1>
          <p className="text-lg text-gray-600">
            了解如何发现、安装和使用 Skills 来增强你的 AI Agent 能力。
          </p>
        </div>

        {/* 内容区域 */}
        <div className="space-y-12">
          {/* 什么是 Skills */}
          <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Code size={20} className="text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">什么是 Skills？</h2>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Skills 是可重用的 AI Agent 能力。它们提供程序化知识，帮助 Agent 更有效地完成特定任务。你可以把它们看作是插件或扩展，用于增强你的 AI Agent 功能。
              </p>
              <p className="text-gray-700 leading-relaxed">
                Skills 生态系统是开源的，由 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">skills</code> CLI 驱动，源代码托管在 <a href="https://github.com/vercel-labs/skills" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">github.com/vercel-labs/skills</a>。
              </p>
            </div>
          </section>

          {/* 快速开始 */}
          <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Download size={20} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">快速开始</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                要安装一个 Skill，使用 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">skills</code> CLI：
              </p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <code className="text-green-400 text-sm font-mono">
                  npx skills add vercel-labs/agent-skills
                </code>
              </div>
              <p className="text-gray-600 text-sm">
                这将安装该 Skill 并使其对你的 AI Agent 可用。
              </p>
            </div>
          </section>

          {/* Skills 排名机制 */}
          <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Skills 排名机制</h2>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Skills 排行榜基于从 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">skills</code> CLI 收集的匿名遥测数据进行排名。当用户安装 Skills 时，聚合的使用数据有助于展示生态系统中最受欢迎和最有用的 Skills。
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-800 text-sm">
                  <strong>隐私保护：</strong> 这些遥测数据是完全匿名的，只跟踪哪些 Skills 被安装——不收集任何个人信息或使用模式。
                </p>
              </div>
            </div>
          </section>

          {/* 浏览 Skills */}
          <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Search size={20} className="text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">浏览 Skills</h2>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                访问 <Link href="/openclaw-skills" className="text-indigo-600 hover:text-indigo-700 underline">OpenClaw Skills 页面</Link> 浏览 Skills 排行榜，发现为你的 Agent 提供的新能力。
              </p>
              <p className="text-gray-700 leading-relaxed">
                你可以按安装数、24小时趋势、分类等方式筛选和排序，找到最适合你需求的 Skills。
              </p>
            </div>
          </section>

          {/* 安全性 */}
          <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">安全性</h2>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                我们定期进行安全审计，评估 Skills 及其内容是否存在恶意内容。要报告安全问题，请访问 <a href="https://security.vercel.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">security.vercel.com</a>。
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-yellow-800 text-sm">
                  <strong>免责声明：</strong> 我们尽力维护一个安全的生态系统，但我们不能保证 skills.sh 上列出的每个 Skill 的质量或安全性。我们鼓励你在安装前审查 Skills，并使用你自己的判断。
                </p>
              </div>
            </div>
          </section>

          {/* 相关链接 */}
          <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">相关链接</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/openclaw-skills"
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Search size={16} className="text-indigo-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">浏览 Skills</div>
                  <div className="text-sm text-gray-500">查看所有可用 Skills</div>
                </div>
              </Link>
              <a
                href="https://github.com/vercel-labs/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Code size={16} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">GitHub 仓库</div>
                  <div className="text-sm text-gray-500">查看源代码</div>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
