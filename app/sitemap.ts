import { MetadataRoute } from "next";
import { TAGS } from "@/data/prompts";

const siteUrl = "https://www.aishorts.top";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/openclaw-skills`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/feedback`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // 分类页面（每个 tag 独立 URL，有独立 SEO 元数据）
  const tagPages: MetadataRoute.Sitemap = TAGS.map((tag) => ({
    url: `${siteUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...tagPages];
}
