import { NextResponse } from "next/server";
import { getProvider, isDemoMode, ProviderError, type AspectRatio } from "@/lib/providers";
import { checkRateLimit, clientIpFrom } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const VALID_RATIOS: AspectRatio[] = ["auto", "9:16", "2:3", "3:4", "1:1", "4:3", "3:2", "16:9"];
const MAX_PROMPT_LEN = 2000;
const MAX_REFERENCES = 4;
const MAX_REFERENCE_BYTES = 6 * 1024 * 1024;

function fail(message: string, status: number, code: string) {
  return NextResponse.json({ error: message, code }, { status });
}

/** data URL 的 base64 段长度换算回原始字节数 */
function approxBytes(dataUrl: string) {
  const b64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  return Math.floor((b64.length * 3) / 4);
}

export async function POST(request: Request) {
  const rate = checkRateLimit(clientIpFrom(request.headers));
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "请求过于频繁，请稍后再试", code: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } }
    );
  }

  let body: { prompt?: unknown; aspectRatio?: unknown; referenceImages?: unknown };
  try {
    body = await request.json();
  } catch {
    return fail("请求格式不正确", 400, "bad_request");
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return fail("请先描述你想要的画面", 400, "empty_prompt");
  if (prompt.length > MAX_PROMPT_LEN) return fail("提示词过长，请精简后重试", 400, "prompt_too_long");

  const aspectRatio = VALID_RATIOS.includes(body.aspectRatio as AspectRatio)
    ? (body.aspectRatio as AspectRatio)
    : "auto";

  const rawRefs = Array.isArray(body.referenceImages) ? body.referenceImages : [];
  const referenceImages = rawRefs
    .filter((r): r is string => typeof r === "string" && r.startsWith("data:image/"))
    .slice(0, MAX_REFERENCES);

  if (referenceImages.some((r) => approxBytes(r) > MAX_REFERENCE_BYTES)) {
    return fail("参考图过大，请压缩到 6MB 以内", 413, "reference_too_large");
  }

  const provider = getProvider();
  if (referenceImages.length > 0 && !provider.supportsImageInput) {
    return fail("当前模型不支持参考图，请移除后重试", 400, "image_input_unsupported");
  }

  try {
    const result = await provider.generate({ prompt, aspectRatio, referenceImages });
    return NextResponse.json({
      ...result,
      provider: provider.id,
      demo: isDemoMode(),
    });
  } catch (err) {
    if (err instanceof ProviderError) return fail(err.message, err.status, err.code);
    console.error("[generate] unexpected failure", err);
    return fail("生成失败，请稍后重试", 500, "internal_error");
  }
}

export async function GET() {
  const provider = getProvider();
  return NextResponse.json({
    provider: provider.id,
    label: provider.label,
    demo: isDemoMode(),
    supportsImageInput: provider.supportsImageInput,
  });
}
