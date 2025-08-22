declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export interface GTMEvent {
  event: string;
  [key: string]: any;
}

export interface CTAClickEvent {
  button_text: string;
  link_destination: string;
  click_position: string;
  page_section: string;
  user_language: string;
}

export interface PlanSelectEvent {
  plan_type: string;
  plan_price: number;
  original_price: number;
  discount_percentage: number;
  currency: string;
  value: number;
}

export interface WhatsAppClickEvent {
  page: string;
  language: string;
  user_journey_step: number;
}

export interface FormSubmitEvent {
  form_type: string;
  success: boolean;
  validation_errors?: string[];
}

// Initialize GTM Data Layer
export function initializeGTM(gtmId: string) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  
  // GTM Script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
}

// Generic event tracking
export function trackEvent(eventName: string, parameters: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !window.dataLayer) return;

  const eventData: GTMEvent = {
    event: eventName,
    timestamp: new Date().toISOString(),
    page_location: window.location.href,
    page_title: document.title,
    user_language: document.documentElement.lang,
    ...parameters,
  };

  window.dataLayer.push(eventData);
}

// Specific event tracking functions
export function trackCTAClick(data: CTAClickEvent) {
  trackEvent('cta_click', {
    button_text: data.button_text,
    link_destination: data.link_destination,
    click_position: data.click_position,
    page_section: data.page_section,
    user_language: data.user_language,
  });
}

export function trackPlanSelection(data: PlanSelectEvent) {
  trackEvent('plan_select', {
    plan_type: data.plan_type,
    plan_price: data.plan_price,
    original_price: data.original_price,
    discount_percentage: data.discount_percentage,
    currency: data.currency,
    value: data.value,
  });
}

export function trackWhatsAppClick(data: WhatsAppClickEvent) {
  trackEvent('whatsapp_click', {
    page: data.page,
    language: data.language,
    user_journey_step: data.user_journey_step,
  });
}

export function trackFormSubmit(data: FormSubmitEvent) {
  trackEvent('form_submit', {
    form_type: data.form_type,
    success: data.success,
    validation_errors: data.validation_errors,
  });
}

export function trackFAQExpand(questionId: string, questionText: string, section: string) {
  trackEvent('faq_expand', {
    question_id: questionId,
    question_text: questionText,
    section: section,
  });
}

export function trackInstallGuideView(deviceType: string, stepNumber: number) {
  trackEvent('install_guide_view', {
    device_type: deviceType,
    step_number: stepNumber,
  });
}

export function trackLanguageSwitch(fromLanguage: string, toLanguage: string) {
  trackEvent('language_switch', {
    from_language: fromLanguage,
    to_language: toLanguage,
  });
}

// Page view tracking
export function trackPageView(path: string, title: string) {
  trackEvent('page_view', {
    page_path: path,
    page_title: title,
  });
}

// Scroll depth tracking
export function initializeScrollTracking() {
  if (typeof window === 'undefined') return;

  let scrollDepths = [25, 50, 75, 100];
  let triggeredDepths: number[] = [];

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !triggeredDepths.includes(depth)) {
        triggeredDepths.push(depth);
        trackEvent('scroll_depth', {
          scroll_depth: depth,
          page_location: window.location.href,
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

// User engagement scoring
export function calculateEngagementScore(): number {
  if (typeof window === 'undefined') return 0;

  const timeOnPage = Date.now() - (window.performance?.timing?.navigationStart || Date.now());
  const scrollDepth = Math.round((window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
  
  // Simple engagement score calculation
  let score = 0;
  
  // Time on page (max 50 points)
  score += Math.min(timeOnPage / 1000 / 60 * 10, 50); // 10 points per minute, max 50
  
  // Scroll depth (max 50 points)
  score += scrollDepth * 0.5;
  
  return Math.round(score);
}
