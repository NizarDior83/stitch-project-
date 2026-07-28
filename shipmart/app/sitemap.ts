import type { MetadataRoute } from "next";

const BASE = "https://shipmart.example.com";

const ROUTES = [
  "", "/how-it-works", "/pricing", "/integrations", "/coverage", "/about",
  "/track", "/quote", "/help", "/contact", "/signup",
  "/legal/terms", "/legal/privacy", "/legal/prohibited-items",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((path) => ({
    url: BASE + path,
    lastModified: now,
    changeFrequency: path.startsWith("/legal") ? "yearly" : "weekly",
    priority: path === "" ? 1 : path === "/pricing" || path === "/quote" ? 0.9 : 0.7,
  }));
}
