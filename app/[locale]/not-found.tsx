import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('notFound');
  const locale = useLocale();
  
  const getLocalizedHref = (href: string) => {
    if (locale === 'en') return href;
    return `/ar${href}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8 max-w-md mx-auto container-padding">
        <div className="text-8xl md:text-9xl font-bold text-accent">404</div>
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {t('title')}
          </h2>
          <p className="text-lg text-foreground-secondary">
            {t('description')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={getLocalizedHref('/')}>
            <Button size="lg">
              <Home className="h-4 w-4 mr-2" />
              {t('goHome')}
            </Button>
          </Link>
          <Link href={getLocalizedHref('/contact')}>
            <Button variant="outline" size="lg">
              <Search className="h-4 w-4 mr-2" />
              {t('contactSupport')}
            </Button>
          </Link>
        </div>
        
        <div className="pt-4">
          <p className="text-sm text-muted">
            {t('needHelp')}{' '}
            <a 
              href="mailto:support@maxprotv.com" 
              className="text-accent hover:underline"
            >
              support@maxprotv.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
