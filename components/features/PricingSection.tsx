'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { PLANS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export function PricingSection() {
  const t = useTranslations('pricing');
  const locale = useLocale();

  const getLocalizedHref = (href: string) => {
    if (locale === 'en') return href;
    return `/ar${href}`;
  };

  return (
    <section className="section-spacing bg-background-2">
      <div className="container-padding mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('title')}
          </h2>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                'popular' in plan && plan.popular ? 'ring-2 ring-accent scale-105' : ''
              } ${('bestValue' in plan && plan.bestValue) ? 'ring-2 ring-secondary' : ''}`}
            >
              {'popular' in plan && plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {t('popular')}
                  </div>
                </div>
              )}
              
              {'bestValue' in plan && plan.bestValue && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium">
                    {t('bestValue')}
                  </div>
                </div>
              )}

              <CardHeader className="text-center">
                <h3 className="text-xl font-semibold text-foreground">
                  {t(`plans.${plan.id}.name`)}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-muted line-through">
                      {formatPrice(plan.originalPrice)}
                    </span>
                    <span className="text-xs bg-accent text-white px-2 py-1 rounded">
                      -{plan.discount}%
                    </span>
                  </div>
                  <div className="text-3xl font-bold gradient-text">
                    {formatPrice(plan.price)}
                  </div>
                  <p className="text-sm text-muted">{plan.duration}</p>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground-secondary">
                        {t(`features.${feature.toLowerCase().replace(/\s+/g, '').replace('&', '').replace('-', '')}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <a 
                  href={`https://wa.me/13322662387?text=${encodeURIComponent(
                    locale === 'ar' 
                      ? `مرحباً، أريد الاشتراك في ${t(`plans.${plan.id}.name`)} بسعر ${formatPrice(plan.price)} لمدة ${plan.duration}`
                      : `Hello, I want to subscribe to ${t(`plans.${plan.id}.name`)} for ${formatPrice(plan.price)} for ${plan.duration}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full">
                    {t('selectPlan')}
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted mb-4">
            {t('guarantee')}
          </p>
          <Link href={getLocalizedHref('/plans')}>
            <Button variant="outline">
              {t('viewAllPlans')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
