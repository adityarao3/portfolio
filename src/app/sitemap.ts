import type { MetadataRoute } from "next";

const siteUrl = "https://aditya-rao.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ["", "/projects", "/work-experience"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
