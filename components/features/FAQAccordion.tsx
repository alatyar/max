'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { FAQ_ITEMS } from '@/lib/constants';

export function FAQAccordion() {
  const t = useTranslations('faq');
  const [openItems, setOpenItems] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  const categories = ['all', 'technical', 'billing', 'troubleshooting', 'legal', 'support'];

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = FAQ_ITEMS.filter(item => {
    const matchesSearch = searchTerm === '' || 
      t(`items.${item.id}.question`).toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(`items.${item.id}.answer`).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
          <Input
            type="text"
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-4 py-2 rounded-btn text-sm font-medium transition-colors',
                activeCategory === category
                  ? 'bg-accent text-white'
                  : 'bg-background-2 text-foreground-secondary hover:bg-background-3'
              )}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-foreground-secondary">{t('noResults')}</p>
            </CardContent>
          </Card>
        ) : (
          filteredFAQs.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-6 text-left hover:bg-background-3 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {t(`items.${item.id}.question`)}
                  </h3>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 text-muted transition-transform flex-shrink-0',
                      openItems.includes(item.id) && 'rotate-180'
                    )}
                  />
                </div>
              </button>
              
              {openItems.includes(item.id) && (
                <CardContent className="px-6 pb-6 pt-0 animate-slide-up">
                  <div className="border-t border-border pt-4">
                    <p className="text-foreground-secondary leading-relaxed">
                      {t(`items.${item.id}.answer`)}
                    </p>
                    <div className="mt-3">
                      <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                        {t(`categories.${item.category}`)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Contact Support */}
      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {t('stillNeedHelp.title')}
          </h3>
          <p className="text-foreground-secondary mb-6">
            {t('stillNeedHelp.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/13322662387?text=${encodeURIComponent(t('whatsappMessage'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {t('contactWhatsApp')}
            </a>
            <a
              href="mailto:support@maxprotv.com"
              className="btn btn-outline"
            >
              {t('contactEmail')}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
