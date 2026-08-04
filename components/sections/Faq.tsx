"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "真的免费吗？有什么套路？",
    a: "免费。不需要信用卡，不需要账号，也不需要你自己的 API Key。站点靠广告收入覆盖生成成本，所以设置了每日额度上限，保证长期跑得下去。",
  },
  {
    q: "需要 ChatGPT 或 OpenAI 账号吗？",
    a: "不需要。模型调用在我们服务端完成，你只要打开网页输入描述就行。",
  },
  {
    q: "每天能生成多少张？",
    a: "每台设备每天 30 张，两次生成之间有 5 分钟冷却。大部分人一天用 2 到 5 张，这个额度完全够用。",
  },
  {
    q: "生成的图片存在哪里？",
    a: "存在你浏览器的 IndexedDB 里，以二进制形式保存在本机。我们服务器不留档。清除浏览器数据后图片就会消失，重要的图请及时下载。",
  },
  {
    q: "我输入的提示词会被保存吗？",
    a: "提示词只会转发给模型服务商用于本次生成，我们不做日志记录、不做长期存储。",
  },
  {
    q: "图片有水印吗？",
    a: "没有。不加站点 logo，不加任何品牌标识，输出的是模型原始结果。",
  },
  {
    q: "生成的图片可以商用吗？",
    a: "需要遵守对应模型服务商的图像使用政策。我们把输出原样交付给你，商业用途请自行确认版权与合规风险，涉及人像、品牌标识的素材尤其要谨慎。",
  },
  {
    q: "支持用参考图修改吗？",
    a: "支持。上传参考图后就会走图生图模式，可以做换背景、改风格、修老照片、试戴试穿这类编辑。最多同时传 4 张。",
  },
  {
    q: "为什么有时候生成失败？",
    a: "常见原因是上游模型繁忙、提示词触发了内容审核、或者参考图太大。稍等片刻重试，或者换个说法描述通常就能解决。",
  },
  {
    q: "怎么才能出图更稳定？",
    a: "把提示词写具体：先说用途（头像、海报、商品图），再说主体和场景，再补光线、风格、镜头。需要画面里有文字时，直接写出确切文案并说明位置。",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">常见问题</h2>
      <p className="text-gray-500 text-center mb-10">关于免费额度、隐私和使用限制</p>

      <div className="space-y-2.5">
        {FAQS.map((item, i) => {
          const expanded = open === i;
          return (
            <div
              key={item.q}
              className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-colors hover:border-gray-300"
            >
              <button
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-gray-800">{item.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>
              {expanded && (
                <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
