import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { FAQAccordion } from '@/components/features/FAQAccordion';
import { StructuredData } from '@/components/seo/StructuredData';
import { OpenGraphTags } from '@/components/seo/OpenGraphTags';
import { FAQ_ITEMS } from '@/lib/constants';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.faq' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('faq');
  const seoT = await getTranslations('seo.faq');

  return (
    <>
      <StructuredData 
        type="faq"
        locale={locale}
      />
      <OpenGraphTags
        title={seoT('title')}
        description={seoT('description')}
        url={locale === 'en' ? '/faq' : '/ar/faq'}
        locale={locale}
      />
      <div className="section-spacing">
        <div className="container-padding mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {t('title')}
            </h1>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <FAQAccordion />
        </div>
      </div>
    </>
  );
}
