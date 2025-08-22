import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.domain;
  const currentDate = new Date();

  const routes = [
    '',
    '/plans',
    '/install',
    '/devices',
    '/faq',
    '/blog',
    '/about',
    '/contact',
    '/legal',
  ];

  // Actual blog posts from content directory
  const blogPosts = [
    // IPTV Guide category
    '/blog/iptv-guide/complete-iptv-guide-2024',
    '/blog/iptv-guide/best-iptv-providers-2024',
    '/blog/iptv-guide/iptv-vs-cable-comparison',
    // Setup Tutorials category
    '/blog/setup-tutorials/max-tv-pro-android-setup',
    '/blog/setup-tutorials/firestick-installation-guide',
    '/blog/setup-tutorials/smart-tv-installation-guide',
    // Troubleshooting category
    '/blog/troubleshooting/iptv-buffering-solutions',
  ];

  const locales = ['en', 'ar'];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add main routes
  routes.forEach((route) => {
    locales.forEach((locale) => {
      const url = locale === 'en' 
        ? `${baseUrl}${route}`
        : `${baseUrl}/${locale}${route}`;
      
      let priority = 0.8;
      let changeFrequency: 'daily' | 'weekly' | 'monthly' = 'weekly';
      
      if (route === '') {
        priority = 1.0;
        changeFrequency = 'daily';
      } else if (route === '/plans') {
        priority = 0.9;
        changeFrequency = 'monthly';
      } else if (route === '/blog') {
        priority = 0.7;
        changeFrequency = 'weekly';
      }
      
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency,
        priority,
        alternates: {
          languages: locales.reduce((acc, loc) => {
            const altUrl = loc === 'en' 
              ? `${baseUrl}${route}`
              : `${baseUrl}/${loc}${route}`;
            acc[loc] = altUrl;
            return acc;
          }, {} as Record<string, string>),
        },
      });
    });
  });

  // Add individual blog posts
  blogPosts.forEach((blogRoute) => {
    locales.forEach((locale) => {
      // For Arabic articles, use the -ar suffix pattern
      const localizedRoute = locale === 'ar' ? `${blogRoute}-ar` : blogRoute;
      const url = locale === 'en' 
        ? `${baseUrl}${localizedRoute}`
        : `${baseUrl}/${locale}${localizedRoute}`;
      
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
          languages: locales.reduce((acc, loc) => {
            const altLocalizedRoute = loc === 'ar' ? `${blogRoute}-ar` : blogRoute;
            const altUrl = loc === 'en' 
              ? `${baseUrl}${altLocalizedRoute}`
              : `${baseUrl}/${loc}${altLocalizedRoute}`;
            acc[loc] = altUrl;
            return acc;
          }, {} as Record<string, string>),
        },
      });
    });
  });

  return sitemapEntries;
}
