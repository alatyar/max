'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

export function LocaleProvider() {
  const locale = useLocale();

  useEffect(() => {
    // Update HTML attributes on the client side
    const html = document.documentElement;
    html.setAttribute('lang', locale);
    html.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
  }, [locale]);

  return null;
}
