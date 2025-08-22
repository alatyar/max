'use client';

import * as React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Smartphone, Tablet, Tv, Monitor, Download, QrCode, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function InstallationGuide() {
  const t = useTranslations('install');
  const locale = useLocale();
  const [activeTab, setActiveTab] = React.useState('android');

  const devices = [
    {
      id: 'android',
      name: t('devices.android'),
      icon: Smartphone,
      color: 'text-success',
    },
    {
      id: 'ios',
      name: t('devices.ios'),
      icon: Tablet,
      color: 'text-secondary',
    },
    {
      id: 'tv',
      name: t('devices.tv'),
      icon: Tv,
      color: 'text-accent',
    },
    {
      id: 'pc',
      name: t('devices.pc'),
      icon: Monitor,
      color: 'text-warning',
    },
  ];

  const installationSteps = {
    android: [
      {
        title: t('steps.android.direct.title'),
        description: t('steps.android.direct.description'),
        icon: Download,
        steps: [
          t('steps.android.direct.step1'),
          t('steps.android.direct.step2'),
          t('steps.android.direct.step3'),
          t('steps.android.direct.step4'),
        ],
      },
      {
        title: t('steps.android.downloader.title'),
        description: t('steps.android.downloader.description'),
        icon: QrCode,
        steps: [
          t('steps.android.downloader.step1'),
          t('steps.android.downloader.step2'),
          t('steps.android.downloader.step3'),
          t('steps.android.downloader.step4'),
          t('steps.android.downloader.step5'),
        ],
      },
    ],
    ios: [
      {
        title: t('steps.ios.splayerpro.title'),
        description: t('steps.ios.splayerpro.description'),
        icon: Download,
        steps: [
          t('steps.ios.splayerpro.step1'),
          t('steps.ios.splayerpro.step2'),
          t('steps.ios.splayerpro.step3'),
          t('steps.ios.splayerpro.step4'),
        ],
      },
    ],
    tv: [
      {
        title: t('steps.tv.smarters.title'),
        description: t('steps.tv.smarters.description'),
        icon: Play,
        steps: [
          t('steps.tv.smarters.step1'),
          t('steps.tv.smarters.step2'),
          t('steps.tv.smarters.step3'),
          t('steps.tv.smarters.step4'),
        ],
      },
      {
        title: t('steps.tv.alternative.title'),
        description: t('steps.tv.alternative.description'),
        icon: Tv,
        steps: [
          t('steps.tv.alternative.step1'),
          t('steps.tv.alternative.step2'),
          t('steps.tv.alternative.step3'),
        ],
      },
    ],
    pc: [
      {
        title: t('steps.pc.smarters.title'),
        description: t('steps.pc.smarters.description'),
        icon: Download,
        steps: [
          t('steps.pc.smarters.step1'),
          t('steps.pc.smarters.step2'),
          t('steps.pc.smarters.step3'),
          t('steps.pc.smarters.step4'),
        ],
      },
      {
        title: t('steps.pc.vlc.title'),
        description: t('steps.pc.vlc.description'),
        icon: Play,
        steps: [
          t('steps.pc.vlc.step1'),
          t('steps.pc.vlc.step2'),
          t('steps.pc.vlc.step3'),
        ],
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Device Tabs */}
      <div className="flex flex-wrap justify-center gap-4">
        {devices.map((device) => (
          <Button
            key={device.id}
            variant={activeTab === device.id ? 'default' : 'outline'}
            onClick={() => setActiveTab(device.id)}
            className="gap-2"
          >
            <device.icon className={`h-4 w-4 ${device.color}`} />
            {device.name}
          </Button>
        ))}
      </div>

      {/* Installation Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {installationSteps[activeTab as keyof typeof installationSteps]?.map((method, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <method.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{method.title}</h3>
                  <p className="text-sm text-muted font-normal">{method.description}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {method.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-accent text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {stepIndex + 1}
                    </div>
                    <div className="text-sm text-foreground-secondary">
                      {step.includes('http') ? (
                        <span dangerouslySetInnerHTML={{
                          __html: step.replace(
                            /(https?:\/\/[^\s]+)/g,
                            `<a href="$1" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-accent-hover underline">${locale === 'ar' ? 'اضغط هنا للتحميل' : 'Download Here'}</a>`
                          )
                        }} />
                      ) : (
                        step
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Information */}
      <div className="bg-background-2 rounded-card p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          {t('additional.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
              <QrCode className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('additional.delivery.title')}</h3>
            <p className="text-sm text-muted">{t('additional.delivery.description')}</p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-3">
              <Play className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('additional.support.title')}</h3>
            <p className="text-sm text-muted">{t('additional.support.description')}</p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-3">
              <Download className="h-6 w-6 text-warning" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('additional.requirements.title')}</h3>
            <p className="text-sm text-muted">{t('additional.requirements.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
