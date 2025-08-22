'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export function TestimonialsSection() {
  const t = useTranslations('testimonials');

  const testimonials = [
    {
      id: 'testimonial1',
      rating: 5,
      country: 'USA',
    },
    {
      id: 'testimonial2',
      rating: 5,
      country: 'UAE',
    },
    {
      id: 'testimonial3',
      rating: 5,
      country: 'Canada',
    },
    {
      id: 'testimonial4',
      rating: 5,
      country: 'UK',
    },
    {
      id: 'testimonial5',
      rating: 5,
      country: 'Germany',
    },
    {
      id: 'testimonial6',
      rating: 5,
      country: 'Saudi Arabia',
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="p-8">
                <div className="absolute top-4 right-4 text-accent/20">
                  <Quote className="h-8 w-8" />
                </div>
                
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-warning fill-current" />
                  ))}
                </div>

                <blockquote className="text-foreground-secondary mb-6 leading-relaxed">
                  "{t(`items.${testimonial.id}.content`)}"
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent-gradient flex items-center justify-center text-white font-semibold text-sm">
                    {t(`items.${testimonial.id}.name`).charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {t(`items.${testimonial.id}.name`)}
                    </div>
                    <div className="text-sm text-muted">
                      {testimonial.country}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-foreground-secondary">{t('stats.uptime')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">50K+</div>
            <div className="text-foreground-secondary">{t('stats.customers')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-foreground-secondary">{t('stats.support')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
