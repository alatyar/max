'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { NAVIGATION } from '@/lib/constants';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('navigation');

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === `/${locale}`;
    }
    return pathname.includes(href);
  };

  const getLocalizedHref = (href: string) => {
    if (locale === 'en') return href;
    return `/ar${href}`;
  };

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    // Remove current locale from pathname
    let currentPath = pathname;
    if (currentPath.startsWith('/ar')) {
      currentPath = currentPath.replace('/ar', '') || '/';
    } else if (currentPath.startsWith('/en')) {
      currentPath = currentPath.replace('/en', '') || '/';
    }
    
    // Build new path
    const newPath = newLocale === 'en' ? currentPath : `/ar${currentPath}`;
    router.push(newPath);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled ? 'navbar-blur' : 'bg-transparent'
      )}
    >
      <nav className="container-padding mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={getLocalizedHref('/')}
            className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-accent transition-colors"
          >
            <img 
              src="/Max-Tv-Pro-logo.png" 
              alt="MAX TV PRO - Premium IPTV Service" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAVIGATION.main.map((item) => (
              <Link
                key={item.href}
                href={getLocalizedHref(item.href)}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent',
                  isActive(item.href)
                    ? 'text-accent'
                    : 'text-foreground-secondary'
                )}
              >
                {t(item.label.toLowerCase())}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={switchLocale}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              {locale === 'en' ? 'العربية' : 'English'}
            </Button>
            <Link href={getLocalizedHref('/plans')}>
              <Button>
                {t('getStarted')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border mt-4 pt-4 pb-6 animate-slide-up">
            <div className="flex flex-col gap-4">
              {NAVIGATION.main.map((item) => (
                <Link
                  key={item.href}
                  href={getLocalizedHref(item.href)}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-accent px-2 py-1',
                    isActive(item.href)
                      ? 'text-accent'
                      : 'text-foreground-secondary'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.label.toLowerCase())}
                </Link>
              ))}
              <div className="flex items-center gap-3 mt-4 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={switchLocale}
                  className="gap-2 flex-1"
                >
                  <Globe className="h-4 w-4" />
                  {locale === 'en' ? 'العربية' : 'English'}
                </Button>
                <Link href={getLocalizedHref('/plans')} className="flex-1">
                  <Button className="w-full">
                    {t('getStarted')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
