const STEPS = [
  {
    title: "描述画面",
    body: "输入一句描述，或者直接点一个模板自动填好提示词。需要精修就再传张参考图。",
  },
  {
    title: "选好比例",
    body: "竖屏做手机壁纸、方图发社交、横图当封面，按用途挑一个就行。",
  },
  {
    title: "点击生成",
    body: "请求送到图像模型，通常 10 到 60 秒出结果，期间不用刷新页面。",
  },
  {
    title: "存到本地",
    body: "结果自动进入你的浏览器图库，可以随时回来下载，也可以一键清空。",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">怎么用</h2>
      <p className="text-gray-500 text-center mb-12">四步出图，全程不用注册</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((step, i) => (
          <div key={step.title} className="relative">
            <div className="text-5xl font-black text-amber-100 leading-none mb-3 select-none">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
