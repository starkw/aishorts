"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, Download, ImagePlus, Images, Loader2, Sparkles, X } from "lucide-react";
import type { AspectRatio } from "@/lib/providers/types";
import { getTemplate, type Template } from "@/data/templates";
import { clearImages, deleteImage, listImages, saveImage, type GalleryItem } from "@/lib/idb";
import { COOLDOWN_MS, consumeQuota, formatCooldown, getQuota, type QuotaSnapshot } from "@/lib/quota";
import TemplatePicker from "./TemplatePicker";
import GalleryPanel from "./GalleryPanel";

/** 比例按钮用一个等比缩略方块示意形状 */
const RATIOS: Array<{ value: AspectRatio; label: string; w: number; h: number }> = [
  { value: "auto", label: "自动", w: 14, h: 14 },
  { value: "9:16", label: "9:16", w: 9, h: 16 },
  { value: "2:3", label: "2:3", w: 11, h: 16 },
  { value: "3:4", label: "3:4", w: 12, h: 16 },
  { value: "1:1", label: "1:1", w: 14, h: 14 },
  { value: "4:3", label: "4:3", w: 16, h: 12 },
  { value: "3:2", label: "3:2", w: 16, h: 11 },
  { value: "16:9", label: "16:9", w: 16, h: 9 },
];

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

    const id = new URLSearchParams(window.location.search).get("template");
    const preset = id ? getTemplate(id) : undefined;
    if (preset) {
      setPrompt(preset.prompt);
      setRatio(preset.ratio);
      if (preset.mode === "i2i") setError("这是图生图模板，记得先上传一张参考图");
    }
  }, []);

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
    setError(template.mode === "i2i" ? "这是图生图模板，记得先上传一张参考图" : null);
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

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
      {/* 标题 + Tab */}
      <div className="px-5 sm:px-6 pt-5 pb-3">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-base font-bold text-gray-900">用 AI 生成图像</h2>
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {([
              { key: "create", label: "创作", icon: Sparkles },
              { key: "gallery", label: `图库${gallery.length ? ` ${gallery.length}` : ""}`, icon: Images },
            ] as const).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  tab === key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={12} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {tab === "create" && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-medium text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            中英文都能写，写得越具体越准
          </div>
        )}
      </div>

      {tab === "gallery" ? (
        <div className="px-5 sm:px-6 pb-6">
          <GalleryPanel items={gallery} onDelete={removeFromGallery} onClear={emptyGallery} />
        </div>
      ) : (
        <div className="px-5 sm:px-6 pb-6 space-y-4">
          <TemplatePicker onPick={applyTemplate} />

          {/* 提示词 */}
          <div>
            <label htmlFor="prompt-input" className="block text-xs font-semibold text-gray-700 mb-1.5">
              提示词
            </label>
            <textarea
              id="prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder="描述你想要的画面，中英文都可以…"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60 text-sm leading-relaxed resize-y focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:bg-white transition-colors"
            />
          </div>

          {/* 参考图 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-gray-700">
                参考图 <span className="font-normal text-gray-400">选填</span>
              </span>
              <button
                onClick={() => fileInput.current?.click()}
                disabled={refs.length >= MAX_REFS}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-gray-200 text-[11px] font-medium text-gray-600 hover:border-amber-400 hover:text-amber-600 disabled:opacity-40 transition-colors"
              >
                <ImagePlus size={11} />
                上传图片
              </button>
            </div>
            {refs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {refs.map((src, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`参考图 ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => setRefs((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-0.5 right-0.5 w-4 h-4 flex items-center justify-center bg-black/60 hover:bg-red-500 text-white rounded-full transition-colors"
                      aria-label="移除参考图"
                    >
                      <X size={9} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            <span className="block text-xs font-semibold text-gray-700 mb-1.5">画面比例</span>
            <div className="flex flex-wrap gap-1.5">
              {RATIOS.map((r) => {
                const active = ratio === r.value;
                return (
                  <button
                    key={r.value}
                    onClick={() => setRatio(r.value)}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                      active
                        ? "bg-amber-400 border-amber-400 text-gray-900"
                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <span
                      style={{ width: r.w, height: r.h }}
                      className={`rounded-sm border-[1.5px] ${
                        active ? "border-gray-900/70" : "border-gray-400"
                      }`}
                    />
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
              <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">{error}</p>
            </div>
          )}

          {/* 额度 + 生成按钮 */}
          <div className="flex items-center gap-4 pt-1">
            <div className="shrink-0">
              <div className="text-xl font-bold text-gray-900 leading-none">
                {quota?.remaining ?? "–"}
                <span className="text-sm font-normal text-gray-400"> / {quota?.limit ?? 30}</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-1 leading-tight">
                每天 {quota?.limit ?? 30} 张免费
                <br />
                每 {COOLDOWN_MS / 60000} 分钟一张
              </div>
            </div>

            <button
              onClick={generate}
              disabled={loading || cooling || exhausted}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-gray-900 bg-amber-400 hover:bg-amber-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg shadow-amber-200/60 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  生成中…
                </>
              ) : exhausted ? (
                "今日额度已用完"
              ) : cooling ? (
                `冷却中 ${formatCooldown(quota!.cooldownMs)}`
              ) : (
                "开始生成"
              )}
            </button>
          </div>

          {/* 结果 */}
          {result && (
            <div className="pt-1">
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={result.url} alt={prompt.slice(0, 60)} className="w-full" />
              </div>
              <div className="flex items-center justify-between gap-3 mt-2.5">
                <span className="text-[11px] text-gray-400 truncate">
                  {result.model}
                  {result.demo && " · 演示模式"}
                </span>
                <a
                  href={result.url}
                  download={`aishorts-${Date.now()}.png`}
                  className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-900 hover:bg-black text-white rounded-lg text-[11px] font-medium transition-colors"
                >
                  <Download size={11} /> 下载原图
                </a>
              </div>
              {result.demo && (
                <p className="mt-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-2">
                  当前为演示模式，输出占位图。配置图像 API 密钥后即可生成真实图像。
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
