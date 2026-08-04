const GUIDE = [
  {
    title: "写好文生图提示词",
    items: [
      "先说用途：头像、商品图、海报、界面稿还是概念草图。",
      "再说主体和场景：人物或物体、环境、时间、光线、镜头远近。",
      "限定一种风格：写实摄影、扁平插画、水彩、3D、杂志封面，别混着来。",
      "画面里要有文字时，直接写出确切文案，并说明位置、字号层级。",
    ],
  },
  {
    title: "用参考图做编辑",
    items: [
      "把最重要的那张放第一位，并明确说出哪些元素必须保持不变。",
      "把修改写成动作：替换背景、匹配光线、保持姿势、更换服装、增强材质细节。",
      "别一次提多个互相冲突的要求，复杂修改拆成两三轮更稳。",
      "涉及人像、logo、商业素材时，先确认你拥有输入图的使用权。",
    ],
  },
  {
    title: "结果不理想怎么办",
    items: [
      "构图跑偏：补充画面比例、主体位置、留白、特写或广角这类约束。",
      "文字糊了：缩短文案、要求大字号、换干净背景，避免一堆小标签。",
      "风格飘了：只保留一个主风格，别同时要写实、油画和矢量。",
      "人物或商品不一致：上传参考图，并逐条点名哪些细节不能改。",
    ],
  },
  {
    title: "使用限制与透明说明",
    items: [
      "生成请求会转发给上游模型服务商，图像不在我们服务器长期留存。",
      "浏览器图库存在本机 IndexedDB，清除浏览器数据会一并删除。",
      "每日额度和冷却机制用于控制成本、降低机器批量滥用。",
      "模型在精确文字、密集排版、跨图角色一致性上仍会翻车，重要商用稿请人工复核。",
    ],
  },
];

export default function PromptGuide() {
  return (
    <section className="bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-center text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3">
          实用指南
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
          怎样把图生得更可用
        </h2>
        <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          出图效果好不好，取决于提示词有没有明确目标、有没有具体的视觉约束、比例选得对不对，
          以及愿不愿意多迭代两轮。下面这些是基于本站工作流总结的经验。
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {GUIDE.map((block) => (
            <div key={block.title} className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">{block.title}</h3>
              <ul className="space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-gray-500 leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
