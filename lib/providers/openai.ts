import {
  ProviderError,
  type AspectRatio,
  type GenerateRequest,
  type GenerateResult,
  type ImageProvider,
} from "./types";

const API_BASE = process.env.OPENAI_BASE_URL?.replace(/\/$/, "") || "https://api.openai.com/v1";
const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
const QUALITY = process.env.OPENAI_IMAGE_QUALITY || "medium";

/** OpenAI 图像接口只接受这三种尺寸，按长宽比就近映射 */
function toOpenAISize(ratio: AspectRatio): "1024x1024" | "1536x1024" | "1024x1536" {
  switch (ratio) {
    case "9:16":
    case "2:3":
    case "3:4":
      return "1024x1536";
    case "4:3":
    case "3:2":
    case "16:9":
      return "1536x1024";
    default:
      return "1024x1024";
  }
}

function dataUrlToBlob(dataUrl: string): Blob {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) throw new ProviderError("参考图格式不正确", 400, "bad_reference");
  const [, mime, b64] = match;
  const bytes = Buffer.from(b64, "base64");
  return new Blob([new Uint8Array(bytes)], { type: mime });
}

async function callOpenAI(path: string, init: RequestInit): Promise<string> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    if (res.status === 429) {
      throw new ProviderError("上游模型繁忙，请稍后再试", 429, "upstream_rate_limit");
    }
    if (res.status === 400 && /safety|moderation|content_policy/i.test(detail)) {
      throw new ProviderError("提示词未通过内容审核，请调整后重试", 400, "moderation_blocked");
    }
    throw new ProviderError(`上游返回 ${res.status}`, 502, "upstream_error");
  }

  const json = (await res.json()) as { data?: Array<{ b64_json?: string; url?: string }> };
  const first = json.data?.[0];
  if (first?.b64_json) return `data:image/png;base64,${first.b64_json}`;
  if (first?.url) return first.url;
  throw new ProviderError("上游未返回图像", 502, "empty_response");
}

export const openaiProvider: ImageProvider = {
  id: "openai",
  label: "OpenAI GPT Image",
  supportsImageInput: true,

  isConfigured() {
    return Boolean(process.env.OPENAI_API_KEY);
  },

  async generate(req: GenerateRequest): Promise<GenerateResult> {
    const started = Date.now();
    const size = toOpenAISize(req.aspectRatio);
    const refs = req.referenceImages ?? [];

    let imageUrl: string;

    if (refs.length > 0) {
      const form = new FormData();
      form.append("model", MODEL);
      form.append("prompt", req.prompt);
      form.append("size", size);
      form.append("quality", QUALITY);
      refs.slice(0, 4).forEach((ref, i) => {
        form.append("image[]", dataUrlToBlob(ref), `reference-${i}.png`);
      });
      imageUrl = await callOpenAI("/images/edits", { method: "POST", body: form });
    } else {
      imageUrl = await callOpenAI("/images/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          prompt: req.prompt,
          size,
          quality: QUALITY,
          n: 1,
        }),
      });
    }

    return { imageUrl, model: MODEL, durationMs: Date.now() - started };
  },
};
