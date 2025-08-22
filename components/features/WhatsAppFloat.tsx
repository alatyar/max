'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateWhatsAppUrl, isRTL } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

export function WhatsAppFloat() {
  const locale = useLocale();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = generateWhatsAppUrl(
    SITE_CONFIG.whatsapp.phone,
    SITE_CONFIG.whatsapp.messages[locale as keyof typeof SITE_CONFIG.whatsapp.messages]
  );

  const rtl = isRTL(locale);

  return (
    <div
      className={cn(
        'fixed bottom-5 z-50 transition-all duration-300',
        rtl ? 'left-5' : 'right-5',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      )}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200 animate-pulse-soft"
        aria-label={locale === 'en' ? 'WhatsApp Support' : 'تواصل واتساب'}
      >
        <MessageCircle className="h-6 w-6" />
        
        {/* Tooltip */}
        <div
          className={cn(
            'absolute bottom-full mb-2 px-3 py-1 bg-background-2 text-foreground text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap',
            rtl ? 'right-0' : 'left-0'
          )}
        >
          {locale === 'en' ? 'Chat with us' : 'تحدث معنا'}
          <div
            className={cn(
              'absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background-2',
              rtl ? 'right-4' : 'left-4'
            )}
          />
        </div>
      </a>
    </div>
  );
}
