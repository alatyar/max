import { useTranslations } from 'next-intl';
import { Hero } from '@/components/features/Hero';
import { PricingSection } from '@/components/features/PricingSection';
import { FeaturesSection } from '@/components/features/FeaturesSection';
import { TestimonialsSection } from '@/components/features/TestimonialsSection';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import { StructuredData } from '@/components/seo/StructuredData';
import { OpenGraphTags } from '@/components/seo/OpenGraphTags';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  
  return generateSEOMetadata({
    title: t('home.title'),
    description: t('home.description'),
    keywords: t('home.keywords'),
    locale,
    canonical: `https://maxprotv.com${locale === 'ar' ? '/ar' : ''}`,
    alternateLocales: [
      { locale: 'en', href: 'https://maxprotv.com' },
      { locale: 'ar', href: 'https://maxprotv.com/ar' }
    ]
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  
  return (
    <>
      <StructuredData type="organization" />
      <StructuredData type="product" />
      <StructuredData type="website" />
      <OpenGraphTags 
        title={t('home.title')}
        description={t('home.description')}
        url={locale === 'ar' ? '/ar' : '/'}
      />
      <Hero />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
    </>
  );
}
