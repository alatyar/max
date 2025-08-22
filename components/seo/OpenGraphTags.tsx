'use client';

import { useLocale } from 'next-intl';

interface OpenGraphTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  locale?: string;
  type?: 'website' | 'article';
  siteName?: string;
}

export function OpenGraphTags({ 
  title, 
  description, 
  image = '/Max-Tv-Pro-logo.png',
  url,
  type = 'website',
  siteName = 'MAX TV PRO'
}: OpenGraphTagsProps) {
  const locale = useLocale();
  const baseUrl = 'https://maxprotv.com';
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  return (
    <>
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale === 'ar' ? 'ar_SA' : 'en_US'} />
      {locale === 'ar' && <meta property="og:locale:alternate" content="en_US" />}
      {locale === 'en' && <meta property="og:locale:alternate" content="ar_SA" />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@maxtvpro" />
      <meta name="twitter:creator" content="@maxtvpro" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#FF5722" />
      <meta name="msapplication-TileColor" content="#FF5722" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="MAX TV PRO" />
    </>
  );
}
