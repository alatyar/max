import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Legal Information - MAX TV PRO Terms & Privacy',
  description: 'Read MAX TV PRO terms of service, privacy policy, and refund policy. Understand your rights and our commitment to data protection.',
  keywords: 'MAX TV PRO terms, privacy policy, refund policy, legal information, IPTV terms',
};

export default function LegalPage() {
  const t = useTranslations('legal');

  return (
    <div className="section-spacing">
      <div className="container-padding mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-8">
          {/* Terms of Service */}
          <Card id="terms">
            <CardHeader>
              <CardTitle className="text-2xl">{t('terms.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="space-y-4 text-foreground-secondary">
                <h3 className="text-lg font-semibold text-foreground">{t('terms.acceptance.title')}</h3>
                <p>{t('terms.acceptance.content')}</p>

                <h3 className="text-lg font-semibold text-foreground">{t('terms.service.title')}</h3>
                <p>{t('terms.service.content')}</p>

                <h3 className="text-lg font-semibold text-foreground">{t('terms.usage.title')}</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>{t('terms.usage.item1')}</li>
                  <li>{t('terms.usage.item2')}</li>
                  <li>{t('terms.usage.item3')}</li>
                  <li>{t('terms.usage.item4')}</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground">{t('terms.payment.title')}</h3>
                <p>{t('terms.payment.content')}</p>

                <h3 className="text-lg font-semibold text-foreground">{t('terms.termination.title')}</h3>
                <p>{t('terms.termination.content')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Policy */}
          <Card id="privacy">
            <CardHeader>
              <CardTitle className="text-2xl">{t('privacy.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="space-y-4 text-foreground-secondary">
                <h3 className="text-lg font-semibold text-foreground">{t('privacy.collection.title')}</h3>
                <p>{t('privacy.collection.content')}</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t('privacy.collection.item1')}</li>
                  <li>{t('privacy.collection.item2')}</li>
                  <li>{t('privacy.collection.item3')}</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground">{t('privacy.usage.title')}</h3>
                <p>{t('privacy.usage.content')}</p>

                <h3 className="text-lg font-semibold text-foreground">{t('privacy.sharing.title')}</h3>
                <p>{t('privacy.sharing.content')}</p>

                <h3 className="text-lg font-semibold text-foreground">{t('privacy.security.title')}</h3>
                <p>{t('privacy.security.content')}</p>

                <h3 className="text-lg font-semibold text-foreground">{t('privacy.rights.title')}</h3>
                <p>{t('privacy.rights.content')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Refund Policy */}
          <Card id="refund">
            <CardHeader>
              <CardTitle className="text-2xl">{t('refund.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="space-y-4 text-foreground-secondary">
                <h3 className="text-lg font-semibold text-foreground">{t('refund.policy.title')}</h3>
                <p>{t('refund.policy.content')}</p>

                <h3 className="text-lg font-semibold text-foreground">{t('refund.conditions.title')}</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>{t('refund.conditions.item1')}</li>
                  <li>{t('refund.conditions.item2')}</li>
                  <li>{t('refund.conditions.item3')}</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground">{t('refund.support.title')}</h3>
                <p>{t('refund.support.content')}</p>

                <h3 className="text-lg font-semibold text-foreground">{t('refund.contact.title')}</h3>
                <p>{t('refund.contact.content')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center bg-background-2 rounded-card p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-foreground-secondary mb-6">
            {t('contact.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@maxprotv.com"
              className="btn btn-outline"
            >
              legal@maxprotv.com
            </a>
            <a
              href={`https://wa.me/13322662387?text=${encodeURIComponent(t('contact.whatsappMessage'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {t('contact.whatsapp')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
