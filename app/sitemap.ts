import type { MetadataRoute } from 'next';

const baseUrl = 'https://sanaullah-portfolio-jet.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: baseUrl, changeFrequency: 'monthly', priority: 1 }];
}
