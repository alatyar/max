'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatDate } from '@/lib/utils';

// Blog posts data matching actual markdown files
const BLOG_POSTS = [
  {
    id: 'complete-iptv-guide-2024',
    title: 'Complete IPTV Guide 2024: Everything You Need to Know About Internet TV Streaming',
    titleAr: 'دليل IPTV الشامل 2024: كل ما تحتاج معرفته عن البث التلفزيوني عبر الإنترنت',
    excerpt: 'Discover everything about IPTV streaming in 2024. Learn how to choose the best IPTV service, setup guides, and why MAX TV PRO leads the market.',
    excerptAr: 'اكتشف كل شيء عن بث IPTV في 2024. تعلم كيفية اختيار أفضل خدمة IPTV وأدلة الإعداد ولماذا يتصدر MAX TV PRO السوق.',
    publishedAt: '2024-01-15',
    readingTime: 12,
    tags: ['IPTV', 'Streaming', 'Guide', '2024'],
    tagsAr: ['IPTV', 'البث المباشر', 'دليل شامل', '2024'],
    featured: true,
    slugAr: 'complete-iptv-guide-2024-ar',
  },
  {
    id: 'best-iptv-providers-2024',
    title: 'Best IPTV Providers 2024: Comprehensive Review and Comparison Guide',
    titleAr: 'أفضل مزودي IPTV 2024: دليل المراجعة والمقارنة الشامل',
    excerpt: 'Compare the top IPTV providers in 2024. Detailed analysis of features, pricing, and performance to help you choose the perfect streaming service.',
    excerptAr: 'قارن أفضل مزودي IPTV في 2024. تحليل مفصل للميزات والأسعار والأداء لمساعدتك في اختيار خدمة البث المثالية.',
    publishedAt: '2024-01-20',
    readingTime: 15,
    tags: ['IPTV Providers', 'Comparison', 'Reviews'],
    tagsAr: ['مزودي IPTV', 'مقارنة', 'مراجعات'],
    featured: false,
    slugAr: 'best-iptv-providers-2024-ar',
  },
  {
    id: 'iptv-vs-cable-comparison',
    title: 'IPTV vs Cable TV 2024: Complete Cost and Feature Comparison',
    titleAr: 'IPTV مقابل التلفزيون الكابلي 2024: مقارنة شاملة للتكلفة والميزات',
    excerpt: 'Detailed comparison of IPTV vs Cable TV in 2024. Discover potential savings, feature differences, and why millions are switching to IPTV services.',
    excerptAr: 'مقارنة مفصلة بين IPTV والتلفزيون الكابلي في 2024. اكتشف التوفير المحتمل والاختلافات في الميزات ولماذا يتحول الملايين لخدمات IPTV.',
    publishedAt: '2024-01-25',
    readingTime: 18,
    tags: ['IPTV vs Cable', 'Cost Comparison', 'Cord Cutting'],
    tagsAr: ['IPTV مقابل الكابل', 'مقارنة التكلفة', 'قطع الكابل'],
    featured: false,
    slugAr: 'iptv-vs-cable-comparison-2024-ar',
  },
  {
    id: 'max-tv-pro-android-setup',
    title: 'MAX TV PRO Android Setup Guide: Complete Installation in 5 Minutes',
    titleAr: 'دليل تثبيت MAX TV PRO للأندرويد: الإعداد الكامل في 5 دقائق',
    excerpt: 'Step-by-step guide to install and setup MAX TV PRO on Android devices. Download APK, activate your subscription, and start streaming in minutes.',
    excerptAr: 'دليل خطوة بخطوة لتثبيت وإعداد MAX TV PRO على أجهزة الأندرويد. حمّل APK وفعّل اشتراكك وابدأ البث في دقائق.',
    publishedAt: '2024-01-30',
    readingTime: 10,
    tags: ['Android Setup', 'Installation', 'Tutorial'],
    tagsAr: ['إعداد الأندرويد', 'التثبيت', 'دليل'],
    featured: false,
    slugAr: 'max-tv-pro-android-setup-ar',
  },
  {
    id: 'firestick-installation-guide',
    title: 'MAX TV PRO Firestick Installation: Complete Setup Guide for Amazon Fire TV',
    titleAr: 'تثبيت MAX TV PRO على Firestick: دليل الإعداد الكامل لأمازون Fire TV',
    excerpt: 'Complete guide to install MAX TV PRO on Amazon Firestick and Fire TV. Step-by-step sideloading instructions with troubleshooting tips.',
    excerptAr: 'دليل كامل لتثبيت MAX TV PRO على Amazon Firestick و Fire TV. تعليمات التحميل الجانبي خطوة بخطوة مع نصائح استكشاف الأخطاء.',
    publishedAt: '2024-02-05',
    readingTime: 12,
    tags: ['Firestick Setup', 'Amazon Fire TV', 'Sideloading'],
    tagsAr: ['إعداد Firestick', 'أمازون Fire TV', 'التحميل الجانبي'],
    featured: false,
    slugAr: 'firestick-installation-guide-ar',
  },
  {
    id: 'smart-tv-installation-guide',
    title: 'MAX TV PRO Smart TV Setup: Install on Samsung, LG, Android TV & More',
    titleAr: 'إعداد MAX TV PRO للتلفزيون الذكي: التثبيت على Samsung و LG و Android TV والمزيد',
    excerpt: 'Complete guide to install MAX TV PRO on all major smart TV brands. Samsung, LG, Sony, TCL setup instructions with troubleshooting tips.',
    excerptAr: 'دليل كامل لتثبيت MAX TV PRO على جميع العلامات التجارية الرئيسية للتلفزيون الذكي. تعليمات الإعداد لـ Samsung و LG و Sony و TCL مع نصائح استكشاف الأخطاء.',
    publishedAt: '2024-02-10',
    readingTime: 14,
    tags: ['Smart TV Setup', 'Samsung TV', 'LG TV'],
    tagsAr: ['إعداد التلفزيون الذكي', 'تلفزيون Samsung', 'تلفزيون LG'],
    featured: false,
    slugAr: 'smart-tv-installation-guide-ar',
  },
  {
    id: 'iptv-buffering-solutions',
    title: 'IPTV Buffering Issues: Complete Troubleshooting Guide to Fix Streaming Problems',
    titleAr: 'مشاكل التخزين المؤقت في IPTV: دليل استكشاف الأخطاء الشامل لإصلاح مشاكل البث',
    excerpt: 'Fix IPTV buffering and streaming issues with our comprehensive troubleshooting guide. Optimize your MAX TV PRO experience for smooth 4K streaming.',
    excerptAr: 'أصلح مشاكل التخزين المؤقت والبث في IPTV مع دليل استكشاف الأخطاء الشامل. حسّن تجربة MAX TV PRO للحصول على بث 4K سلس.',
    publishedAt: '2024-02-15',
    readingTime: 16,
    tags: ['Buffering Fix', 'Troubleshooting', 'Performance'],
    tagsAr: ['إصلاح التخزين المؤقت', 'استكشاف الأخطاء', 'الأداء'],
    featured: false,
    slugAr: 'iptv-buffering-solutions-ar',
  },
];

export function BlogList() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedTag, setSelectedTag] = React.useState<string>('all');

  // Get localized content for posts
  const getLocalizedPost = (post: any) => {
    if (locale === 'ar') {
      return {
        ...post,
        title: post.titleAr || post.title,
        excerpt: post.excerptAr || post.excerpt,
        tags: post.tagsAr || post.tags
      };
    }
    return post;
  };

  // Get localized tag name
  const getLocalizedTag = (tag: string) => {
    if (locale === 'ar' && t.has(`tags.${tag}`)) {
      return t(`tags.${tag}`);
    }
    return tag;
  };

  const getLocalizedHref = (href: string) => {
    if (locale === 'en') return href;
    return `/ar${href}`;
  };

  // Get all unique tags
  const allTags = Array.from(
    new Set(BLOG_POSTS.flatMap(post => post.tags))
  );

  // Filter posts based on search and tag
  const filteredPosts = BLOG_POSTS.filter(post => {
    const localizedPost = getLocalizedPost(post);
    const matchesSearch = searchTerm === '' || 
      localizedPost.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      localizedPost.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const featuredPost = BLOG_POSTS.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-4 py-2 rounded-btn text-sm font-medium transition-colors ${
              selectedTag === 'all'
                ? 'bg-accent text-white'
                : 'bg-background-2 text-foreground-secondary hover:bg-background-3'
            }`}
          >
            {t('tags.all')}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-btn text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-accent text-white'
                  : 'bg-background-2 text-foreground-secondary hover:bg-background-3'
              }`}
            >
              {getLocalizedTag(tag)}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && searchTerm === '' && selectedTag === 'all' && (
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-accent/20 to-secondary/20 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-accent" />
                </div>
                <div className="text-sm text-accent font-medium">{t('featured')}</div>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <div className="flex items-center gap-4 text-sm text-muted mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(featuredPost.publishedAt, locale)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {featuredPost.readingTime} {t('minRead')}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                {getLocalizedPost(featuredPost).title}
              </h2>
              <p className="text-foreground-secondary mb-4 leading-relaxed">
                {getLocalizedPost(featuredPost).excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded"
                    >
                      {getLocalizedTag(tag)}
                    </span>
                  ))}
                </div>
                <Link href={getLocalizedHref(`/blog/${locale === 'ar' && featuredPost.slugAr ? featuredPost.slugAr : featuredPost.id}`)}>
                  <Button variant="outline" size="sm">
                    {t('readMore')}
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Regular Posts Grid */}
      {regularPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => {
            const localizedPost = getLocalizedPost(post);
            return (
              <Card key={post.id} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.publishedAt, locale)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readingTime} {t('minRead')}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{localizedPost.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-foreground-secondary mb-4 leading-relaxed flex-1">
                    {localizedPost.excerpt}
                  </p>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded"
                        >
                          {getLocalizedTag(tag)}
                        </span>
                      ))}
                    </div>
                    <Link href={getLocalizedHref(`/blog/${locale === 'ar' && post.slugAr ? post.slugAr : post.id}`)}>
                      <Button variant="outline" size="sm" className="w-full">
                        {t('readMore')}
                        <ArrowRight className="h-3 w-3 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-foreground-secondary">{t('noResults')}</p>
          </CardContent>
        </Card>
      )}

      {/* Newsletter Signup */}
      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            {t('newsletter.title')}
          </h3>
          <p className="text-foreground-secondary mb-6 max-w-md mx-auto">
            {t('newsletter.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t('newsletter.placeholder')}
              className="flex-1"
            />
            <Button>
              {t('newsletter.subscribe')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
