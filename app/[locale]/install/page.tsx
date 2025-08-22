import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { InstallationGuide } from '@/components/features/InstallationGuide';
import { StructuredData } from '@/components/seo/StructuredData';
import { OpenGraphTags } from '@/components/seo/OpenGraphTags';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.install' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function InstallPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'install' });
  const seoT = await getTranslations({ locale, namespace: 'seo.install' });

  return (
    <>
      <StructuredData 
        type="howto"
        locale={locale}
      />
      <OpenGraphTags
        title={seoT('title')}
        description={seoT('description')}
        url={locale === 'en' ? '/install' : '/ar/install'}
        locale={locale}
        type="article"
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

        {/* App Screenshots */}
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center mb-16">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{t('screenshots.mobile')}</h3>
            <img 
              src="/max-tv-pro_.png" 
              alt="واجهة تطبيق MAX TV PRO للهاتف المحمول - شاشة القنوات والقوائم الرئيسية بجودة 4K" 
              className="rounded-lg shadow-lg max-w-xs mx-auto"
              loading="lazy"
              width="300"
              height="600"
            />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{t('screenshots.download')}</h3>
            <img 
              src="/max-tv-pro-apk.png" 
              alt="تحميل MAX TV PRO APK للأندرويد - ملف التطبيق الرسمي المجاني والآمن" 
              className="rounded-lg shadow-lg max-w-xs mx-auto"
              loading="lazy"
              width="300"
              height="400"
            />
          </div>
        </div>

        <InstallationGuide />
      </div>
    </div>
    </>
  );
}
