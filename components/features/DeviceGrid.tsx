'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Smartphone, Tablet, Tv, Monitor, Check, X, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DEVICES } from '@/lib/constants';

export function DeviceGrid() {
  const t = useTranslations('devices');
  const locale = useLocale();

  const getLocalizedHref = (href: string) => {
    if (locale === 'en') return href;
    return `/ar${href}`;
  };

  const getDeviceIcon = (category: string) => {
    switch (category) {
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      case 'tv':
        return Tv;
      case 'computer':
        return Monitor;
      default:
        return Monitor;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mobile':
        return 'text-success';
      case 'tablet':
        return 'text-secondary';
      case 'tv':
        return 'text-accent';
      case 'computer':
        return 'text-warning';
      default:
        return 'text-muted';
    }
  };

  return (
    <div className="space-y-12">
      {/* Device Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEVICES.map((device) => {
          const IconComponent = getDeviceIcon(device.category);
          const colorClass = getCategoryColor(device.category);

          return (
            <Card key={device.id} className="h-full">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-background-3 flex items-center justify-center">
                    <IconComponent className={`h-8 w-8 ${colorClass}`} />
                  </div>
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  {device.name}
                  {device.supported ? (
                    <Check className="h-5 w-5 text-success" />
                  ) : (
                    <X className="h-5 w-5 text-error" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    {t('installMethod')}
                  </h4>
                  <p className="text-sm text-foreground-secondary">
                    {device.installMethod}
                  </p>
                </div>
                
                {device.requirements && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      {t('requirements.title')}
                    </h4>
                    <ul className="space-y-1">
                      {device.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-foreground-secondary flex items-start gap-2">
                          <Check className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link href={getLocalizedHref('/install')}>
                  <Button variant="outline" size="sm" className="w-full">
                    {t('viewGuide')}
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Compatibility Matrix */}
      <div className="bg-background-2 rounded-card p-8">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          {t('compatibility.title')}
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  {t('compatibility.device')}
                </th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">
                  {t('compatibility.supported')}
                </th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">
                  {t('compatibility.quality')}
                </th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">
                  {t('compatibility.multiDevice')}
                </th>
              </tr>
            </thead>
            <tbody>
              {DEVICES.map((device) => (
                <tr key={device.id} className="border-b border-border/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {React.createElement(getDeviceIcon(device.category), {
                        className: `h-5 w-5 ${getCategoryColor(device.category)}`,
                      })}
                      <span className="text-foreground">{device.name}</span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-4">
                    {device.supported ? (
                      <Check className="h-5 w-5 text-success mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-error mx-auto" />
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="text-sm text-foreground-secondary">4K/HD</span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('requirements.recommended.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground-secondary">
                  {t('requirements.recommended.internet')}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground-secondary">
                  {t('requirements.recommended.ram')}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground-secondary">
                  {t('requirements.recommended.storage')}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('requirements.minimum.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground-secondary">
                  {t('requirements.minimum.internet')}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground-secondary">
                  {t('requirements.minimum.ram')}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground-secondary">
                  {t('requirements.minimum.storage')}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
