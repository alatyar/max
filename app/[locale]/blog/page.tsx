import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { BlogList } from '@/components/features/BlogList';
import { StructuredData } from '@/components/seo/StructuredData';
import { OpenGraphTags } from '@/components/seo/OpenGraphTags';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.blog' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function BlogPage({ params: { locale } }: Props) {
  const t = await getTranslations('blog');
  const seoT = await getTranslations('seo.blog');

  return (
    <>
      <StructuredData 
        type="website"
        locale={locale}
      />
      <OpenGraphTags
        title={seoT('title')}
        description={seoT('description')}
        url={locale === 'en' ? '/blog' : '/ar/blog'}
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

        <BlogList />
      </div>
    </div>
    </>
  );
}
