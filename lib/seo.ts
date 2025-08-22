import { Metadata } from 'next';
import { SITE_CONFIG } from './constants';
import { StructuredData } from '@/types';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  locale?: string;
  alternateLocales?: { locale: string; href: string }[];
}

export function generateMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  noindex = false,
  locale = 'en',
  alternateLocales = [],
}: SEOProps): Metadata {
  const fullTitle = title.includes(SITE_CONFIG.name) ? title : `${title} - ${SITE_CONFIG.name}`;
  const url = canonical || SITE_CONFIG.domain;
  const image = ogImage || `${SITE_CONFIG.domain}/og-image.jpg`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords,
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: SITE_CONFIG.social.twitter,
    },
    alternates: {
      canonical: url,
      languages: alternateLocales.reduce((acc, alt) => {
        acc[alt.locale] = alt.href;
        return acc;
      }, {} as Record<string, string>),
    },
  };

  return metadata;
}

export function generateHreflangLinks(
  pathname: string,
  locales: string[] = ['en', 'ar']
): { locale: string; href: string }[] {
  return locales.map((locale) => ({
    locale,
    href: locale === 'en' 
      ? `${SITE_CONFIG.domain}${pathname}`
      : `${SITE_CONFIG.domain}/${locale}${pathname}`,
  }));
}

export function generateOrganizationSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    logo: `${SITE_CONFIG.domain}/logo.svg`,
    description: SITE_CONFIG.description,
    foundingDate: '2023',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${SITE_CONFIG.whatsapp.phone}`,
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
    },
    sameAs: [
      `https://twitter.com/${SITE_CONFIG.social.twitter}`,
      `https://facebook.com/${SITE_CONFIG.social.facebook}`,
      `https://instagram.com/${SITE_CONFIG.social.instagram}`,
    ],
  };
}

export function generateServiceSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${SITE_CONFIG.name} IPTV Service`,
    description: SITE_CONFIG.description,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain,
    },
    serviceType: 'IPTV Streaming Service',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'IPTV Subscription Plans',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Monthly IPTV Plan',
          },
          price: '6',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Yearly IPTV Plan',
          },
          price: '29',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      ],
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  image?: string;
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || `${SITE_CONFIG.domain}/og-image.jpg`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.domain}/logo.svg`,
      },
    },
  };
}

export function generateBreadcrumbSchema(breadcrumbs: { name: string; url: string }[]): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
