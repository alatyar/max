import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, pathnames, localePrefix } from './lib/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  pathnames,
  localePrefix,
  localeDetection: false,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
