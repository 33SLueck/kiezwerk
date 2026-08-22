import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config/site';

/** Sitemap vorhanden, Indexierung aber per robots/noindex untersagt (Demo). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const paths = [
    '',
    '/leistungen',
    '/projekte',
    '/faq',
    '/anfrage',
    '/kontakt',
    '/impressum',
    '/datenschutz',
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.5,
  }));
}
