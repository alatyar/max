export interface Plan {
  id: string;
  name: string;
  duration: string;
  originalPrice: number;
  price: number;
  discount: number;
  popular?: boolean;
  bestValue?: boolean;
  features: readonly string[];
}

export interface Device {
  id: string;
  name: string;
  category: 'mobile' | 'tv' | 'computer' | 'tablet';
  icon: string;
  supported: boolean;
  installMethod: string;
  requirements?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  tags: string[];
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export type Locale = 'en' | 'ar';

export interface LocalizedContent {
  en: string;
  ar: string;
}
