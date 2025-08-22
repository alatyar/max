'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { Plan } from '@/types';
import { formatPrice } from '@/lib/utils';

interface PricingCardProps {
  plan: Plan;
}

export function PricingCard({ plan }: PricingCardProps) {
  const t = useTranslations('pricing');
  const locale = useLocale();

  const getLocalizedHref = (href: string) => {
    if (locale === 'en') return href;
    return `/ar${href}`;
  };

  return (
    <Card
      className={`relative ${
        plan.popular ? 'ring-2 ring-accent scale-105' : ''
      } ${plan.bestValue ? 'ring-2 ring-secondary' : ''}`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-accent text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            {t('popular')}
          </div>
        </div>
      )}
      
      {plan.bestValue && (
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
  );
}
