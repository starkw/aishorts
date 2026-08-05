/**
 * 图像模型能力参考榜，数据来自 Arena 的匿名两两对比投票榜单。
 * 榜单是实时变化的，这里记录抓取当天的快照，更新时同步改 checkedAt。
 */

export interface BoardEntry {
  rank: number;
  model: string;
  vendor: string;
  score: number;
}

export const BOARD_CHECKED_AT = "2026 年 8 月 4 日";

export const textToImageBoard: BoardEntry[] = [
  { rank: 1, model: "gpt-image-2", vendor: "OpenAI", score: 1381 },
  { rank: 2, model: "reve-2.1", vendor: "Reve", score: 1300 },
  { rank: 3, model: "muse-image", vendor: "Meta", score: 1281 },
  { rank: 4, model: "reve-2.0", vendor: "Reve", score: 1270 },
  { rank: 5, model: "nano-banana-2", vendor: "Google", score: 1263 },
];

export const imageEditBoard: BoardEntry[] = [
  { rank: 1, model: "gpt-image-2", vendor: "OpenAI", score: 1463 },
  { rank: 2, model: "muse-image", vendor: "Meta", score: 1407 },
  { rank: 3, model: "mai-image-2.5", vendor: "Microsoft AI", score: 1400 },
  { rank: 4, model: "grok-imagine", vendor: "xAI", score: 1390 },
  { rank: 5, model: "nano-banana-pro", vendor: "Google", score: 1389 },
];

export const boardHighlights = [
  { label: "文生图榜首", value: "1381", delta: "±5" },
  { label: "图像编辑榜首", value: "1463", delta: "±4" },
  { label: "评分方式", value: "盲测", delta: "两两对比投票" },
];
