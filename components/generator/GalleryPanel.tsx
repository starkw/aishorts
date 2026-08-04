"use client";

import { Download, Trash2, ImageOff } from "lucide-react";
import type { GalleryItem } from "@/lib/idb";

interface Props {
  items: GalleryItem[];
  onDelete: (id: string) => void;
  onClear: () => void;
}

function download(item: GalleryItem) {
  const a = document.createElement("a");
  a.href = item.objectUrl;
  a.download = `aishorts-${item.id}.png`;
  a.click();
}

export default function GalleryPanel({ items, onDelete, onClear }: Props) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ImageOff size={32} className="mx-auto text-gray-300 mb-3" />
        <p className="text-sm text-gray-500 mb-1">图库还是空的</p>
        <p className="text-xs text-gray-400">生成的图片会自动存到这里，只保存在你的浏览器</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          共 {items.length} 张 · 存储在本设备浏览器中
        </p>
        <button
          onClick={onClear}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          清空图库
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.objectUrl}
              alt={item.prompt.slice(0, 40)}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5">
              <p className="text-[11px] text-white/90 line-clamp-4 leading-relaxed">{item.prompt}</p>
              <div className="flex gap-1.5">
                <button
                  onClick={() => download(item)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white/95 hover:bg-white text-gray-800 rounded-lg text-[11px] font-medium transition-colors"
                >
                  <Download size={11} /> 下载
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="px-2 py-1.5 bg-white/20 hover:bg-red-500 text-white rounded-lg transition-colors"
                  aria-label="删除"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
