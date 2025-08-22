import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/Card';
import { Shield, Users, Zap, Award } from 'lucide-react';
import { StructuredData } from '@/components/seo/StructuredData';
import { OpenGraphTags } from '@/components/seo/OpenGraphTags';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.about' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function AboutPage({ params: { locale } }: Props) {
  const t = await getTranslations('about');
  const seoT = await getTranslations('seo.about');

  const values = [
    {
      icon: Shield,
      title: t('values.reliability.title'),
      description: t('values.reliability.description'),
      color: 'text-accent',
    },
    {
      icon: Users,
      title: t('values.customer.title'),
      description: t('values.customer.description'),
      color: 'text-secondary',
    },
    {
      icon: Zap,
      title: t('values.innovation.title'),
      description: t('values.innovation.description'),
      color: 'text-success',
    },
    {
      icon: Award,
      title: t('values.quality.title'),
      description: t('values.quality.description'),
      color: 'text-warning',
    },
  ];

  return (
    <>
      <StructuredData 
        type="organization"
        locale={locale}
      />
      <OpenGraphTags
        title={seoT('title')}
        description={seoT('description')}
        url={locale === 'en' ? '/about' : '/ar/about'}
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

        {/* Mission Section */}
        <div className="bg-background-2 rounded-card p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('mission.title')}
            </h2>
            <p className="text-lg text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
              {t('mission.description')}
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="text-center h-full">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-background-3 flex items-center justify-center">
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-hero-gradient rounded-card p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('stats.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
              <div className="text-foreground-secondary">{t('stats.customers')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">99.9%</div>
              <div className="text-foreground-secondary">{t('stats.uptime')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-foreground-secondary">{t('stats.support')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
