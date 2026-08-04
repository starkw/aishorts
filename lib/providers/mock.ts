import { resolveSize, type GenerateRequest, type GenerateResult, type ImageProvider } from "./types";

const PALETTES = [
  ["#6366f1", "#a855f7"],
  ["#0ea5e9", "#6366f1"],
  ["#f97316", "#ef4444"],
  ["#10b981", "#0ea5e9"],
  ["#ec4899", "#8b5cf6"],
  ["#f59e0b", "#ec4899"],
];

function escapeXml(text: string) {
  return text.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c] as string)
  );
}

/** 按字符宽度粗略折行，中文按 1 格、西文按 0.55 格估算 */
function wrap(text: string, maxUnits: number, maxLines: number) {
  const lines: string[] = [];
  let line = "";
  let units = 0;
  for (const ch of text) {
    const w = /[\u4e00-\u9fa5\u3000-\u303f]/.test(ch) ? 1 : 0.55;
    if (units + w > maxUnits) {
      lines.push(line);
      if (lines.length >= maxLines) return lines;
      line = "";
      units = 0;
    }
    line += ch;
    units += w;
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * 未配置任何真实图像 API 时的兜底实现。
 * 返回一张带提示词摘要的渐变占位图，保证前端链路可完整演练。
 */
export const mockProvider: ImageProvider = {
  id: "mock",
  label: "演示模式",
  supportsImageInput: true,

  isConfigured() {
    return true;
  },

  async generate(req: GenerateRequest): Promise<GenerateResult> {
    const started = Date.now();
    const { width, height } = resolveSize(req.aspectRatio);
    const [from, to] = PALETTES[Math.floor(Math.random() * PALETTES.length)];

    const fontSize = Math.round(Math.min(width, height) * 0.05);
    const lines = wrap(req.prompt.trim() || "AI Shorts", 18, 5);
    const startY = height / 2 - ((lines.length - 1) * fontSize * 1.5) / 2 + fontSize * 0.35;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <circle cx="${width * 0.18}" cy="${height * 0.2}" r="${width * 0.22}" fill="#ffffff" opacity="0.08"/>
  <circle cx="${width * 0.85}" cy="${height * 0.82}" r="${width * 0.28}" fill="#ffffff" opacity="0.06"/>
  <text x="50%" y="${height * 0.14}" text-anchor="middle" fill="#ffffff" opacity="0.75"
        font-family="system-ui,-apple-system,sans-serif" font-size="${fontSize * 0.62}" font-weight="600"
        letter-spacing="2">DEMO MODE</text>
  ${lines
    .map(
      (l, i) =>
        `<text x="50%" y="${startY + i * fontSize * 1.5}" text-anchor="middle" fill="#ffffff"
        font-family="system-ui,-apple-system,sans-serif" font-size="${fontSize}" font-weight="700">${escapeXml(l)}</text>`
    )
    .join("\n  ")}
  <text x="50%" y="${height - fontSize}" text-anchor="middle" fill="#ffffff" opacity="0.6"
        font-family="system-ui,-apple-system,sans-serif" font-size="${fontSize * 0.55}">
    ${width} × ${height} · 配置 API 后输出真实图像
  </text>
</svg>`;

    // 模拟真实生成的等待感
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 700));

    return {
      imageUrl: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
      model: "demo-placeholder",
      durationMs: Date.now() - started,
    };
  },
};
