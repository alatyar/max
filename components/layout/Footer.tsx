'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { NAVIGATION, SITE_CONFIG } from '@/lib/constants';

export function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const getLocalizedHref = (href: string) => {
    if (locale === 'en') return href;
    return `/ar${href}`;
  };

  return (
    <footer className="bg-background-3 border-t border-border">
      <div className="container-padding mx-auto section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href={getLocalizedHref('/')}
              className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-accent transition-colors"
            >
              <div className="h-8 w-8 rounded bg-accent-gradient flex items-center justify-center text-white font-bold">
                M
              </div>
              MAX TV PRO
            </Link>
            <p className="text-sm text-muted max-w-xs">
              {t('description')}
            </p>
          </div>

          {/* Service Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t('service')}</h3>
            <ul className="space-y-2">
              {NAVIGATION.footer.service.map((item) => (
                <li key={item.href}>
                  <Link
                    href={getLocalizedHref(item.href)}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {t(`links.${item.label.toLowerCase().replace(/\s+/g, '')}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t('company')}</h3>
            <ul className="space-y-2">
              {NAVIGATION.footer.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={getLocalizedHref(item.href)}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {t(`links.${item.label.toLowerCase().replace(/\s+/g, '')}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t('legal')}</h3>
            <ul className="space-y-2">
              {NAVIGATION.footer.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={getLocalizedHref(item.href)}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {t(`links.${item.label.toLowerCase().replace(/\s+/g, '').replace('policy', '').replace('service', '').replace('of', '')}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted">
              © {currentYear} {SITE_CONFIG.name}. {t('rights')}
            </p>
            <p className="text-xs text-muted-2 max-w-md text-center md:text-right">
              {t('disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
