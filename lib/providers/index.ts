import { mockProvider } from "./mock";
import { openaiProvider } from "./openai";
import { siliconflowProvider } from "./siliconflow";
import type { ImageProvider } from "./types";

const REGISTRY: ImageProvider[] = [openaiProvider, siliconflowProvider];

/**
 * 选择生效的 Provider：
 * 1. IMAGE_PROVIDER 指定且已配置 → 用它
 * 2. 否则取第一个配置完整的
 * 3. 都没配 → 回退演示模式，保证站点可用
 */
export function getProvider(): ImageProvider {
  const preferred = process.env.IMAGE_PROVIDER;
  if (preferred) {
    const hit = REGISTRY.find((p) => p.id === preferred);
    if (hit?.isConfigured()) return hit;
  }
  return REGISTRY.find((p) => p.isConfigured()) ?? mockProvider;
}

export function isDemoMode() {
  return getProvider().id === mockProvider.id;
}

export * from "./types";
