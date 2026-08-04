"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Download,
  ImagePlus,
  Images,
  Loader2,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import type { AspectRatio } from "@/lib/providers/types";
import { getTemplate, type Template } from "@/data/templates";
import { clearImages, deleteImage, listImages, saveImage, type GalleryItem } from "@/lib/idb";
import { COOLDOWN_MS, consumeQuota, formatCooldown, getQuota, type QuotaSnapshot } from "@/lib/quota";
import TemplatePicker from "./TemplatePicker";
import GalleryPanel from "./GalleryPanel";

const RATIOS: AspectRatio[] = ["auto", "9:16", "2:3", "3:4", "1:1", "4:3", "3:2", "16:9"];
const MAX_REFS = 4;
const MAX_REF_BYTES = 6 * 1024 * 1024;

type Tab = "create" | "gallery";

interface GenerateResponse {
  imageUrl: string;
  model: string;
  demo: boolean;
  error?: string;
}

export default function GeneratorPanel() {
  const [tab, setTab] = useState<Tab>("create");
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState<AspectRatio>("auto");
  const [refs, setRefs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; model: string; demo: boolean } | null>(null);
  const [quota, setQuota] = useState<QuotaSnapshot | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuota(getQuota());
    listImages().then(setGallery).catch(() => {});

    // 模板卡片通过 ?template=id 跳转过来时自动填入
    const id = new URLSearchParams(window.location.search).get("template");
    const preset = id ? getTemplate(id) : undefined;
    if (preset) {
      setPrompt(preset.prompt);
      setRatio(preset.ratio);
      if (preset.mode === "i2i") setError("这是图生图模板，记得先上传一张参考图");
    }
  }, []);

  // 冷却期间每秒刷新一次倒计时
  useEffect(() => {
    if (!quota?.cooldownMs) return;
    const timer = setInterval(() => setQuota(getQuota()), 1000);
    return () => clearInterval(timer);
  }, [quota?.cooldownMs]);

  const addFiles = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;
      const room = MAX_REFS - refs.length;
      if (room <= 0) {
        setError(`最多上传 ${MAX_REFS} 张参考图`);
        return;
      }
      Array.from(files)
        .slice(0, room)
        .forEach((file) => {
          if (!file.type.startsWith("image/")) return;
          if (file.size > MAX_REF_BYTES) {
            setError("单张参考图请控制在 6MB 以内");
            return;
          }
          const reader = new FileReader();
          reader.onload = () => setRefs((prev) => [...prev, reader.result as string]);
          reader.readAsDataURL(file);
        });
    },
    [refs.length]
  );

  const applyTemplate = useCallback((template: Template) => {
    setPrompt(template.prompt);
    setRatio(template.ratio);
    setError(null);
    if (template.mode === "i2i") {
      setError("这是图生图模板，记得先上传一张参考图");
    }
    document.getElementById("prompt-input")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const generate = useCallback(async () => {
    if (!prompt.trim()) {
      setError("请先描述你想要的画面");
      return;
    }
    const current = getQuota();
    if (current.remaining <= 0) {
      setError("今日免费额度已用完，明天再来吧");
      return;
    }
    if (current.cooldownMs > 0) {
      setError(`冷却中，还需等待 ${formatCooldown(current.cooldownMs)}`);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, aspectRatio: ratio, referenceImages: refs }),
      });
      const data = (await res.json()) as GenerateResponse;

      if (!res.ok) {
        setError(data.error || "生成失败，请稍后重试");
        return;
      }

      setResult({ url: data.imageUrl, model: data.model, demo: data.demo });
      setQuota(consumeQuota());

      const saved = await saveImage({
        dataUrl: data.imageUrl,
        prompt,
        aspectRatio: ratio,
        model: data.model,
      }).catch(() => null);
      if (saved) setGallery((prev) => [saved, ...prev]);
    } catch {
      setError("网络异常，请检查连接后重试");
    } finally {
      setLoading(false);
    }
  }, [prompt, ratio, refs]);

  const removeFromGallery = useCallback(async (id: string) => {
    await deleteImage(id);
    setGallery((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const emptyGallery = useCallback(async () => {
    await clearImages();
    setGallery([]);
  }, []);

  const cooling = (quota?.cooldownMs ?? 0) > 0;
  const exhausted = (quota?.remaining ?? 1) <= 0;
  const disabled = loading || cooling || exhausted;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-indigo-100/50 overflow-hidden">
      {/* 顶部 Tab */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 sm:px-6">
        <div className="flex">
          {([
            { key: "create", label: "创作", icon: Sparkles },
            { key: "gallery", label: `我的图库${gallery.length ? ` (${gallery.length})` : ""}`, icon: Images },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === key
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
        {quota && (
          <div className="text-right shrink-0">
            <div className="text-sm font-semibold text-gray-800">
              {quota.remaining}
              <span className="text-gray-400 font-normal"> / {quota.limit}</span>
            </div>
            <div className="text-[11px] text-gray-400">今日剩余</div>
          </div>
        )}
      </div>

      {tab === "gallery" ? (
        <div className="p-4 sm:p-6">
          <GalleryPanel items={gallery} onDelete={removeFromGallery} onClear={emptyGallery} />
        </div>
      ) : (
        <div className="p-4 sm:p-6 space-y-5">
          <TemplatePicker onPick={applyTemplate} />

          <div className="border-t border-gray-100 pt-5 space-y-4">
            {/* 提示词 */}
            <div>
              <label htmlFor="prompt-input" className="block text-sm font-semibold text-gray-700 mb-2">
                描述你想要的画面
              </label>
              <textarea
                id="prompt-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder="例如：一只戴眼镜的橘猫坐在书桌前看书，暖色台灯光，浅景深，写实摄影风格"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <p className="mt-1.5 text-xs text-gray-400">
                中文英文都可以，描述越具体结果越稳定：主体 + 场景 + 光线 + 风格 + 镜头
              </p>
            </div>

            {/* 参考图 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  参考图 <span className="font-normal text-gray-400">选填 · 用于图生图</span>
                </span>
                <span className="text-xs text-gray-400">
                  {refs.length} / {MAX_REFS}
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {refs.map((src, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`参考图 ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => setRefs((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-black/60 hover:bg-red-500 text-white rounded-full transition-colors"
                      aria-label="移除参考图"
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
                {refs.length < MAX_REFS && (
                  <button
                    onClick={() => fileInput.current?.click()}
                    className="w-20 h-20 flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
                  >
                    <ImagePlus size={17} />
                    <span className="text-[10px]">上传</span>
                  </button>
                )}
              </div>
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </div>

            {/* 比例 */}
            <div>
              <span className="block text-sm font-semibold text-gray-700 mb-2">画面比例</span>
              <div className="flex flex-wrap gap-2">
                {RATIOS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRatio(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      ratio === r
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
                    }`}
                  >
                    {r === "auto" ? "自动" : r}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 px-3.5 py-3 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">{error}</p>
              </div>
            )}

            <button
              onClick={generate}
              disabled={disabled}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  生成中，通常需要 10-60 秒…
                </>
              ) : exhausted ? (
                "今日额度已用完"
              ) : cooling ? (
                `冷却中 · ${formatCooldown(quota!.cooldownMs)}`
              ) : (
                <>
                  <Wand2 size={16} />
                  开始生成
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              每天 {quota?.limit ?? 30} 张免费额度，每 {COOLDOWN_MS / 60000} 分钟可生成一张
            </p>

            {/* 结果 */}
            {result && (
              <div className="pt-2">
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={result.url} alt={prompt.slice(0, 60)} className="w-full" />
                </div>
                <div className="flex items-center justify-between gap-3 mt-3">
                  <span className="text-xs text-gray-400 truncate">
                    模型 {result.model}
                    {result.demo && " · 演示模式"}
                  </span>
                  <a
                    href={result.url}
                    download={`aishorts-${Date.now()}.png`}
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    <Download size={12} /> 下载原图
                  </a>
                </div>
                {result.demo && (
                  <p className="mt-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    当前是演示模式，输出的是占位图。配置图像 API 密钥后即可生成真实图像。
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
