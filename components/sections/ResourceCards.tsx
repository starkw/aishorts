const RESOURCES = [
  {
    path: "提示词结构",
    tag: "基础",
    body: "用途 + 主体 + 场景 + 光线 + 风格 + 镜头。六段式写法，出图稳定性最高。",
  },
  {
    path: "白底商品图",
    tag: "电商",
    body: "上传商品照，要求纯白背景、柔和影棚光、保留标签与材质，直接出主图。",
  },
  {
    path: "人像转头像",
    tag: "头像",
    body: "换中性背景 + 柔光 + 方形裁切，明确要求五官不变，避免变成另一个人。",
  },
  {
    path: "老照片修复",
    tag: "修复",
    body: "去划痕、补细节、纠正偏色，强调「克制还原」，不然模型会自己编造五官。",
  },
  {
    path: "海报留白",
    tag: "排版",
    body: "让模型只出底图并留出文字区，标题用设计软件后期加，比让模型写字靠谱。",
  },
  {
    path: "风格一致性",
    tag: "进阶",
    body: "同一批图想统一风格，把风格描述抽成固定前缀，每次只改主体部分。",
  },
  {
    path: "参考图权重",
    tag: "图生图",
    body: "最重要的参考图放第一张，并逐条点名哪些元素必须保持不变。",
  },
  {
    path: "分步精修",
    tag: "图生图",
    body: "别一次提多个冲突要求。换背景、改光线、调材质拆成两三轮，成功率更高。",
  },
  {
    path: "文字渲染",
    tag: "避坑",
    body: "需要画面内有字时，缩短文案、要求大字号、用干净背景，避免一堆小标签。",
  },
];

export default function ResourceCards() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-3">
        实战小抄
      </h2>
      <p className="text-sm text-gray-500 text-center mb-10">
        从大量出图里总结出来的写法，照着抄就能少走弯路
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {RESOURCES.map((r) => (
          <div
            key={r.path}
            className="rounded-xl bg-gray-950 border border-gray-800 overflow-hidden hover:border-amber-500/40 transition-colors"
          >
            {/* 终端标题栏 */}
            <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-gray-800">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-1.5 text-[10px] font-mono text-gray-500 truncate">{r.path}</span>
            </div>

            <div className="px-3.5 py-4">
              <p className="text-xs text-gray-300 leading-relaxed mb-3 font-mono">
                <span className="text-amber-400">$ </span>
                {r.body}
              </p>
              <span className="inline-block px-2 py-0.5 rounded bg-gray-800 text-[10px] font-mono text-gray-400">
                {r.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
