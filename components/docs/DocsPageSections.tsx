"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Terminal, HelpCircle, LayoutList } from "lucide-react";

const SECTION_IDS = ["overview", "cli", "faq"] as const;
type SectionId = (typeof SECTION_IDS)[number];

const navItems: { id: SectionId; label: string; icon: typeof LayoutList }[] = [
  { id: "overview", label: "概述", icon: LayoutList },
  { id: "cli", label: "命令行界面", icon: Terminal },
  { id: "faq", label: "常问问题", icon: HelpCircle },
];

/** 顶栏 + 移动端目录条大致占用高度，用于判定当前章节 */
const SCROLL_OFFSET = 100;

function pickActiveSection(): SectionId {
  let current: SectionId = "overview";
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    if (top <= SCROLL_OFFSET) current = id;
  }
  return current;
}

export function DocsPageSections() {
  const [active, setActive] = useState<SectionId>("overview");

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash || !SECTION_IDS.includes(hash as SectionId)) return;
    setActive(hash as SectionId);
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setActive(pickActiveSection());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onHash = () => {
      const h = window.location.hash.slice(1);
      if (h && SECTION_IDS.includes(h as SectionId)) {
        setActive(h as SectionId);
        requestAnimationFrame(() => document.getElementById(h)?.scrollIntoView({ behavior: "auto", block: "start" }));
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const goTo = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
      setActive(id);
    }
  }, []);

  const navLinkClass = (id: SectionId, mobile?: boolean) => {
    const on = active === id;
    if (mobile) {
      return on
        ? "shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-indigo-50 border border-indigo-200 text-indigo-800 shadow-sm"
        : "shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-700 shadow-sm";
    }
    return [
      "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors text-left",
      on
        ? "bg-indigo-50 text-indigo-800 font-medium"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    ].join(" ");
  };

  return (
    <>
      <div className="lg:hidden sticky top-14 z-30 -mx-4 px-4 py-2 bg-gray-50/95 backdrop-blur border-b border-gray-100 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin" role="tablist" aria-label="文档章节">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active === id}
              className={navLinkClass(id, true)}
              onClick={() => goTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-400">目录</p>
            <nav aria-label="文档目录">
              <ul className="space-y-1">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <li key={id}>
                    <button type="button" className={navLinkClass(id)} onClick={() => goTo(id)}>
                      <Icon size={16} className="shrink-0 opacity-80" aria-hidden />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="space-y-16 min-w-0">
          <section id="overview" className="scroll-mt-28 lg:scroll-mt-28">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-4">
              <LayoutList size={18} aria-hidden />
              概述
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">什么是 Skills？</h2>
                <p className="text-gray-700 leading-relaxed">
                  Skills 是面向 AI Agent 的可复用能力，提供程序性知识，让 Agent 更高效地完成特定任务。可理解为插件或扩展，用来增强
                  Agent 能做的事；其中也可包含代码生成模式、领域知识、工具集成等。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">排行榜与发现</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  生态中的排行榜会依据命令行工具的匿名安装统计，帮助呈现较受欢迎、较常用的 Skills（详见下方「命令行界面」中的遥测说明）。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  精选提示词与站内导航请前往{" "}
                  <Link href="/" className="text-indigo-600 hover:underline font-medium">
                    本站首页
                  </Link>
                  ；Skills 聚合与安装命令可参考{" "}
                  <Link href="/openclaw-skills" className="text-indigo-600 hover:underline">
                    OpenClaw Skills
                  </Link>
                  。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">安全说明</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  官方会对 Skills 及其内容进行例行安全审计，排查恶意内容。若需报告安全问题，请使用{" "}
                  <a
                    href="https://security.vercel.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline inline-flex items-center gap-0.5"
                  >
                    安全报告入口
                    <ExternalLink size={14} className="shrink-0" />
                  </a>
                  。
                </p>
                <p className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg p-4 leading-relaxed">
                  平台会尽力维护安全，但无法保证每一个 Skill 的质量与安全性；安装前请自行审查仓库与说明，谨慎判断。
                </p>
              </div>
            </div>
          </section>

          <section id="cli" className="scroll-mt-28 lg:scroll-mt-28">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-4">
              <Terminal size={18} aria-hidden />
              命令行界面
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm space-y-8">
              <p className="text-gray-700 leading-relaxed">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">skills</code>{" "}
                命令行是安装和管理 Skills 的主要方式。驱动排行榜的 CLI 已{" "}
                <a
                  href="https://github.com/vercel-labs/skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline inline-flex items-center gap-0.5"
                >
                  开源
                  <ExternalLink size={14} className="shrink-0" />
                </a>
                。
              </p>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">安装方式</h3>
                <p className="text-gray-700 mb-3">
                  一般无需全局安装，通过{" "}
                  <code className="bg-gray-100 px-1 rounded text-sm font-mono">npx</code> 直接执行即可。
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm font-mono whitespace-pre">
                    npx skills add {"<"}组织或用户名{">"}/{"<"}技能名{">"}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">基本用法</h3>
                <p className="text-gray-700 mb-3">指定仓库所有者与技能名称即可安装，例如：</p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-3">
                  <code className="text-green-400 text-sm font-mono whitespace-pre">
                    npx skills add vercel-labs/agent-skills
                  </code>
                </div>
                <p className="text-gray-600 text-sm">命令会下载该 Skill 并完成配置，供你的 AI Agent 使用。</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">遥测与隐私</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  默认情况下，CLI 会收集匿名遥测数据（例如技能名、相关文件与时间戳等），用于排行榜排序；不包含个人或设备标识类信息。
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">若需关闭遥测，可在执行前设置环境变量：</p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm font-mono whitespace-pre">
                    DISABLE_TELEMETRY=1 npx skills add vercel-labs/agent-skills
                  </code>
                </div>
                <p className="text-gray-600 text-sm mt-3">（在 Windows 可使用对应方式设置环境变量后再执行命令。）</p>
              </div>
            </div>
          </section>

          <section id="faq" className="scroll-mt-28 lg:scroll-mt-28">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-4">
              <HelpCircle size={18} aria-hidden />
              常问问题
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm divide-y divide-gray-100">
              <FaqItem
                q="什么是 Skills？"
                a="面向 AI Agent 的可复用能力，用程序性知识帮助完成具体任务；可包含模板、规范、工具使用方式等，类似给 Agent 用的「能力包」。"
              />
              <FaqItem
                q="怎样安装一个 Skill？"
                a="使用命令行：npx skills add 所有者/技能名。例如 npx skills add vercel-labs/agent-skills 可安装一组 Agent 相关技能。"
              />
              <FaqItem
                q="哪些 AI 编程助手支持 Skills？"
                a="常见如 Claude Code、Cursor、Windsurf 等与技能生态兼容的环境均可配合使用；具体以各 Skill 仓库说明为准。"
              />
              <FaqItem
                q="排行榜是怎么排的？"
                a="主要依据 skills CLI 的匿名安装统计聚合而成，用于反映安装热度；不依赖个人身份信息。"
              />
              <FaqItem
                q="怎样让我的 Skill 出现在排行榜上？"
                a="当用户通过 npx skills add 安装你的技能时，匿名遥测会参与统计；安装量积累后会反映在排行中。"
              />
              <FaqItem
                q="会收集我的个人隐私吗？"
                a="遥测为匿名聚合数据，用于统计安装了哪些技能；不按官方说明收集可识别个人身份的信息或使用画像。"
              />
              <FaqItem
                q="如何自己做一个 Skill？"
                a="通常将技能放在 GitHub 仓库中，包含技能定义与 README 使用说明；可参考热门技能的目录结构与写法。"
              />
              <FaqItem
                q="可以关闭遥测吗？"
                a="可以。设置环境变量 DISABLE_TELEMETRY=1 后再执行安装命令，详见上文「命令行界面」。"
              />
              <FaqItem
                q="某个 Skill 有问题怎么反馈？"
                a="一般由作者在其 GitHub 仓库维护，可在对应仓库提交 Issue；官方技能页通常会附有仓库链接。"
              />
            </div>
          </section>

          <p className="text-center text-sm text-gray-500 pb-8">
            本页结构与内容参考 skills.sh 文档（
            <a
              href="https://skills.sh/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              概述
            </a>
            {" / "}
            <a
              href="https://skills.sh/docs/cli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              命令行
            </a>
            {" / "}
            <a
              href="https://skills.sh/docs/faq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              常见问题
            </a>
            ），版权归原作者所有。
          </p>
        </div>
      </div>
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="py-6 first:pt-0 last:pb-0">
      <h3 className="text-base font-semibold text-gray-900 mb-2">{q}</h3>
      <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed">{a}</p>
    </div>
  );
}
