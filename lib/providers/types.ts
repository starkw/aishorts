export type AspectRatio = "auto" | "9:16" | "2:3" | "3:4" | "1:1" | "4:3" | "3:2" | "16:9";

export interface GenerateRequest {
  prompt: string;
  aspectRatio: AspectRatio;
  /** 参考图，data URL 或公网可访问的 URL；有值时走图生图 */
  referenceImages?: string[];
}

export interface GenerateResult {
  /** data URL 或图片直链，前端统一按 URL 处理 */
  imageUrl: string;
  /** 实际生效的模型名，用于前端展示 */
  model: string;
  /** 毫秒 */
  durationMs: number;
}

export interface ImageProvider {
  readonly id: string;
  readonly label: string;
  /** 是否支持参考图（图生图） */
  readonly supportsImageInput: boolean;
  /** 缺少必要配置时返回 false，用于回退到 mock */
  isConfigured(): boolean;
  generate(req: GenerateRequest): Promise<GenerateResult>;
}

export class ProviderError extends Error {
  constructor(
    message: string,
    readonly status: number = 502,
    readonly code: string = "provider_error"
  ) {
    super(message);
    this.name = "ProviderError";
  }
}

/** 各家 API 的尺寸参数写法不一，统一在这里换算 */
export const RATIO_TO_SIZE: Record<Exclude<AspectRatio, "auto">, { width: number; height: number }> = {
  "9:16": { width: 864, height: 1536 },
  "2:3": { width: 1024, height: 1536 },
  "3:4": { width: 1152, height: 1536 },
  "1:1": { width: 1024, height: 1024 },
  "4:3": { width: 1536, height: 1152 },
  "3:2": { width: 1536, height: 1024 },
  "16:9": { width: 1536, height: 864 },
};

export function resolveSize(ratio: AspectRatio) {
  return ratio === "auto" ? RATIO_TO_SIZE["1:1"] : RATIO_TO_SIZE[ratio];
}
