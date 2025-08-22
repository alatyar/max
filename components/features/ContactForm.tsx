'use client';

import * as React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, MessageCircle, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { contactFormSchema, ContactFormData } from '@/lib/validations';
import { trackFormSubmit } from '@/lib/analytics';
import { generateWhatsAppUrl } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Create WhatsApp message with form data
      const whatsappMessage = `مرحباً فريق MAX TV PRO،

اسم المرسل: ${data.name}
البريد الإلكتروني: ${data.email}
الموضوع: ${data.subject}

الرسالة:
${data.message}

شكراً لكم.`;
      
      const whatsappUrl = generateWhatsAppUrl(
        SITE_CONFIG.whatsapp.phone,
        whatsappMessage
      );
      
      // Open WhatsApp with the form data
      window.open(whatsappUrl, '_blank');
      
      // Mark as success and reset form
      setSubmitStatus('success');
      reset();
      
      trackFormSubmit({
        form_type: 'contact',
        success: true,
      });
      
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      trackFormSubmit({
        form_type: 'contact',
        success: false,
        validation_errors: Object.keys(errors),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = generateWhatsAppUrl(
    SITE_CONFIG.whatsapp.phone,
    SITE_CONFIG.whatsapp.messages[locale as keyof typeof SITE_CONFIG.whatsapp.messages]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Contact Methods */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-whatsapp" />
              {t('methods.whatsapp.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground-secondary mb-4">
              {t('methods.whatsapp.description')}
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-whatsapp hover:bg-whatsapp/90">
                {t('methods.whatsapp.button')}
              </Button>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-secondary" />
              {t('methods.email.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground-secondary mb-4">
              {t('methods.email.description')}
            </p>
            <a href="mailto:support@maxprotv.com">
              <Button variant="outline" className="w-full">
                support@maxprotv.com
              </Button>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-accent" />
              {t('methods.hours.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground-secondary">{t('methods.hours.support')}</span>
                <span className="text-foreground font-medium">24/7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-secondary">{t('methods.hours.response')}</span>
                <span className="text-foreground font-medium">&lt; 30 min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('form.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-card">
                <p className="text-success font-medium">{t('form.success')}</p>
                <p className="text-success/80 text-sm mt-2">
                  {locale === 'ar' ? 'تم توجيهك إلى واتساب مع بيانات النموذج.' : 'You have been redirected to WhatsApp with your form data.'}
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-card">
                <p className="text-error font-medium">{t('form.error')}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t('form.name')} *
                  </label>
                  <Input
                    id="name"
                    {...register('name')}
                    error={errors.name?.message}
                    placeholder={t('form.namePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t('form.email')} *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    placeholder={t('form.emailPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  {t('form.subject')} *
                </label>
                <Input
                  id="subject"
                  {...register('subject')}
                  error={errors.subject?.message}
                  placeholder={t('form.subjectPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t('form.message')} *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register('message')}
                  className="input resize-none"
                  placeholder={t('form.messagePlaceholder')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-error">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? t('form.sending') : t('form.send')}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted text-center">
                {t('form.privacy')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
