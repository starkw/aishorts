import { Trophy } from "lucide-react";
import {
  BOARD_CHECKED_AT,
  boardHighlights,
  imageEditBoard,
  textToImageBoard,
  type BoardEntry,
} from "@/data/model-board";

function Board({ title, entries }: { title: string; entries: BoardEntry[] }) {
  const top = entries[0].score;

  return (
    <div className="bg-white rounded-2xl border border-amber-100 p-5">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <span className="text-[11px] text-gray-400">榜单快照 · {BOARD_CHECKED_AT}</span>
      </div>

      <ol className="space-y-2.5">
        {entries.map((e) => (
          <li key={e.model} className="flex items-center gap-3">
            <span
              className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                e.rank === 1 ? "bg-amber-400 text-gray-900" : "bg-gray-100 text-gray-500"
              }`}
            >
              {e.rank}
            </span>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-800 truncate">{e.model}</span>
                <span className="shrink-0 text-xs font-mono text-gray-500">{e.score}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${e.rank === 1 ? "bg-amber-400" : "bg-gray-300"}`}
                    style={{ width: `${Math.round((e.score / top) * 100)}%` }}
                  />
                </div>
                <span className="shrink-0 text-[10px] text-gray-400 w-20 truncate">{e.vendor}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function ModelBoard() {
  return (
    <section className="bg-amber-50/60 border-y border-amber-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10">
          {/* 左：说明 */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-amber-200 text-[11px] font-medium text-amber-700 mb-4">
              <Trophy size={11} />
              模型能力参考
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-4">
              生成和编辑，
              <br />
              哪些模型排在前面
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Arena 的图像榜单由匿名两两对比投票产生，不看参数只看人眼偏好，
              是目前比较可信的横向参考。榜单实时变动，下面是抓取当天的快照。
            </p>

            <div className="space-y-2.5 mb-6">
              {boardHighlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white border border-amber-100"
                >
                  <span className="text-xs text-gray-500">{h.label}</span>
                  <span className="flex items-baseline gap-1.5">
                    <span className="text-base font-bold text-gray-900">{h.value}</span>
                    <span className="text-[10px] text-gray-400">{h.delta}</span>
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed">
              说明：本站实际使用的模型取决于服务端配置，可能与榜首模型不同。
              上表仅作为选型参考，不代表本站当前输出效果。
            </p>
          </div>

          {/* 右：两个榜单 */}
          <div className="space-y-4">
            <Board title="文生图 Top 5" entries={textToImageBoard} />
            <Board title="图像编辑 Top 5" entries={imageEditBoard} />
          </div>
        </div>
      </div>
    </section>
  );
}
