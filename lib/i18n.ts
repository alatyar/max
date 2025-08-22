import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'en' as const;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

export const pathnames = {
  '/': '/',
  '/plans': '/plans',
  '/install': '/install',
  '/devices': '/devices',
  '/faq': '/faq',
  '/blog': '/blog',
  '/about': '/about',
  '/contact': '/contact',
  '/legal': '/legal',
} as const;

export const localePrefix = 'as-needed';

export type Pathnames = keyof typeof pathnames;
