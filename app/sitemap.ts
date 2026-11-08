import type { MetadataRoute } from 'next';
import { caseStudies } from '@/content/caseStudies';

const baseUrl = 'https://sanaullah-portfolio-jet.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'monthly', priority: 1 },
    ...caseStudies.map((study) => ({ url: `${baseUrl}/projects/${study.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
  return pages;
}
