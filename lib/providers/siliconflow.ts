import {
  ProviderError,
  type AspectRatio,
  type GenerateRequest,
  type GenerateResult,
  type ImageProvider,
} from "./types";

const API_BASE = process.env.SILICONFLOW_BASE_URL?.replace(/\/$/, "") || "https://api.siliconflow.cn/v1";
const MODEL = process.env.SILICONFLOW_IMAGE_MODEL || "Kwai-Kolors/Kolors";

/** 硅基流动只接受枚举尺寸，按长宽比就近映射 */
function toSize(ratio: AspectRatio): string {
  switch (ratio) {
    case "9:16":
      return "720x1280";
    case "2:3":
    case "3:4":
      return "768x1024";
    case "4:3":
    case "3:2":
      return "1024x768";
    case "16:9":
      return "1280x720";
    default:
      return "1024x1024";
  }
}

export const siliconflowProvider: ImageProvider = {
  id: "siliconflow",
  label: "硅基流动",
  supportsImageInput: true,

  isConfigured() {
    return Boolean(process.env.SILICONFLOW_API_KEY);
  },

  async generate(req: GenerateRequest): Promise<GenerateResult> {
    const started = Date.now();
    const ref = req.referenceImages?.[0];

    const res = await fetch(`${API_BASE}/images/generations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        prompt: req.prompt,
        image_size: toSize(req.aspectRatio),
        batch_size: 1,
        num_inference_steps: 20,
        guidance_scale: 7.5,
        ...(ref ? { image: ref } : {}),
      }),
    });

    if (!res.ok) {
      if (res.status === 429) {
        throw new ProviderError("上游模型繁忙，请稍后再试", 429, "upstream_rate_limit");
      }
      throw new ProviderError(`上游返回 ${res.status}`, 502, "upstream_error");
    }

    const json = (await res.json()) as { images?: Array<{ url?: string }> };
    const url = json.images?.[0]?.url;
    if (!url) throw new ProviderError("上游未返回图像", 502, "empty_response");

    return { imageUrl: url, model: MODEL, durationMs: Date.now() - started };
  },
};
