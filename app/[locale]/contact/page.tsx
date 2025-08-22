import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { ContactForm } from '@/components/features/ContactForm';
import { StructuredData } from '@/components/seo/StructuredData';
import { OpenGraphTags } from '@/components/seo/OpenGraphTags';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.contact' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function ContactPage({ params: { locale } }: Props) {
  const t = await getTranslations('contact');
  const seoT = await getTranslations('seo.contact');

  return (
    <>
      <StructuredData 
        type="organization"
        locale={locale}
      />
      <OpenGraphTags
        title={seoT('title')}
        description={seoT('description')}
        url={locale === 'en' ? '/contact' : '/ar/contact'}
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

        <ContactForm />
      </div>
    </div>
    </>
  );
}
