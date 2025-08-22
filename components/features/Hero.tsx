'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Play, Shield, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const router = useRouter();

  const getLocalizedHref = (href: string) => {
    if (locale === 'en') return href;
    return `/ar${href}`;
  };

  const features = [
    {
      icon: Play,
      title: t('features.quality.title'),
      description: t('features.quality.description'),
    },
    {
      icon: Zap,
      title: t('features.instant.title'),
      description: t('features.instant.description'),
    },
    {
      icon: Shield,
      title: t('features.reliable.title'),
      description: t('features.reliable.description'),
    },
    {
      icon: Users,
      title: t('features.support.title'),
      description: t('features.support.description'),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="container-padding mx-auto section-spacing">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance">
              <span className="gradient-text">MAX TV PRO</span>
              <br />
              <span className="text-foreground">{t('title')}</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto text-pretty">
              {t('subtitle')}
            </p>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/Max-Tv-Pro-logo.png" 
              alt="MAX TV PRO - اشتراك MAX TV PRO أقوى سيرفر ماكس برو للبث المباشر مع تحميل برنامج MAX TV Pro للاندرويد" 
              className="h-20 md:h-24 w-auto"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-white hover:bg-accent-hover h-11 px-8 text-lg cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                console.log('Plans button clicked - navigating to:', getLocalizedHref('/plans'));
                router.push(getLocalizedHref('/plans'));
              }}
              type="button"
            >
              {t('cta.primary')}
            </button>
            <button 
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border bg-transparent hover:bg-background-2 text-foreground h-11 px-8 text-lg cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                console.log('Install button clicked - navigating to:', getLocalizedHref('/install'));
                router.push(getLocalizedHref('/install'));
              }}
              type="button"
            >
              {t('cta.secondary')}
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 text-sm text-muted">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span>{t('proof.uptime')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{t('proof.customers')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>{t('proof.guarantee')}</span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
