import { MetadataRoute } from "next";
import { prompts } from "@/data/prompts";

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
      url: `${siteUrl}/feedback`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  return [...staticPages];
}
