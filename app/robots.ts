import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/projects/' },
    sitemap: 'https://sanaullah-portfolio-jet.vercel.app/sitemap.xml',
  };
}
