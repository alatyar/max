'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Tv, Smartphone, Monitor, Tablet, Wifi, Clock, Shield, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export function FeaturesSection() {
  const t = useTranslations('features');

  const features = [
    {
      icon: Tv,
      title: t('streaming.title'),
      description: t('streaming.description'),
      color: 'text-accent',
    },
    {
      icon: Smartphone,
      title: t('devices.title'),
      description: t('devices.description'),
      color: 'text-secondary',
    },
    {
      icon: Wifi,
      title: t('quality.title'),
      description: t('quality.description'),
      color: 'text-success',
    },
    {
      icon: Clock,
      title: t('activation.title'),
      description: t('activation.description'),
      color: 'text-warning',
    },
    {
      icon: Shield,
      title: t('security.title'),
      description: t('security.description'),
      color: 'text-accent',
    },
    {
      icon: Headphones,
      title: t('support.title'),
      description: t('support.description'),
      color: 'text-secondary',
    },
  ];

  return (
    <section className="section-spacing">
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
          {features.map((feature, index) => (
            <Card key={index} className="group hover:scale-105 transition-transform duration-200">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-background-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Device Compatibility Grid */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('compatibility.title')}
            </h3>
            <p className="text-foreground-secondary">
              {t('compatibility.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, name: t('compatibility.devices.mobile') },
              { icon: Tv, name: t('compatibility.devices.tv') },
              { icon: Monitor, name: t('compatibility.devices.computer') },
              { icon: Tablet, name: t('compatibility.devices.tablet') },
            ].map((device, index) => (
              <div key={index} className="text-center p-6 rounded-card bg-background-2 hover:bg-background-3 transition-colors">
                <device.icon className="h-12 w-12 text-accent mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">{device.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
