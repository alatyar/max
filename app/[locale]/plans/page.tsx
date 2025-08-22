import { PricingCard } from '@/components/features/PricingCard';
import { PLANS } from '@/lib/constants';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import { StructuredData } from '@/components/seo/StructuredData';
import { OpenGraphTags } from '@/components/seo/OpenGraphTags';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  
  return generateSEOMetadata({
    title: t('plans.title'),
    description: t('plans.description'),
    keywords: t('plans.keywords'),
    locale,
    canonical: `https://maxprotv.com${locale === 'ar' ? '/ar' : ''}/plans`,
    alternateLocales: [
      { locale: 'en', href: 'https://maxprotv.com/plans' },
      { locale: 'ar', href: 'https://maxprotv.com/ar/plans' }
    ]
  });
}

export default async function PlansPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'plans' });
  const tSeo = await getTranslations({ locale, namespace: 'seo' });

  return (
    <>
      <StructuredData type="product" />
      <OpenGraphTags 
        title={tSeo('plans.title')}
        description={tSeo('plans.description')}
        url={locale === 'ar' ? '/ar/plans' : '/plans'}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-background-2 rounded-card p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t('guarantee')}
            </h2>
            <p className="text-foreground-secondary mb-6">
              {t('guaranteeDescription')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-accent text-2xl font-bold mb-2">✓</div>
                <h3 className="font-semibold text-foreground mb-1">{t('benefits.instant')}</h3>
                <p className="text-sm text-muted">{t('benefits.instantDesc')}</p>
              </div>
              <div className="text-center">
                <div className="text-accent text-2xl font-bold mb-2">✓</div>
                <h3 className="font-semibold text-foreground mb-1">{t('benefits.support')}</h3>
                <p className="text-sm text-muted">{t('benefits.supportDesc')}</p>
              </div>
              <div className="text-center">
                <div className="text-accent text-2xl font-bold mb-2">✓</div>
                <h3 className="font-semibold text-foreground mb-1">{t('benefits.quality')}</h3>
                <p className="text-sm text-muted">{t('benefits.qualityDesc')}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
