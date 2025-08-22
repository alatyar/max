'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Breadcrumbs() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('breadcrumbs');

  const getLocalizedHref = (href: string) => {
    if (locale === 'en') return href;
    return `/ar${href}`;
  };

  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    
    // Remove locale from segments if present
    const segments = pathSegments.filter(segment => segment !== 'ar' && segment !== 'en');
    
    const breadcrumbs = [
      { label: t('home'), href: '/' }
    ];

    let currentPath = '';
    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        label: t(segment) || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  // Generate structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://maxprotv.com${getLocalizedHref(item.href)}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <nav aria-label="Breadcrumb" className="container-padding mx-auto py-4" itemScope itemType="https://schema.org/BreadcrumbList">
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <li 
              key={item.href} 
              className="flex items-center gap-2"
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(index + 1)} />
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-2" />
              )}
              {index === 0 && <Home className="h-4 w-4 text-muted-2" />}
              {index === breadcrumbs.length - 1 ? (
                <span 
                  className="text-foreground font-medium" 
                  itemProp="name"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={getLocalizedHref(item.href)}
                  className="text-muted hover:text-accent transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
