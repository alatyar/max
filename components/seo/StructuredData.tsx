'use client';

import { useLocale } from 'next-intl';

interface StructuredDataProps {
  type: 'organization' | 'product' | 'website' | 'breadcrumb' | 'faq' | 'howto' | 'article' | 'image';
  locale?: string;
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const locale = useLocale();
  
  const getStructuredData = () => {
    const baseUrl = 'https://maxprotv.com';
    
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MAX TV PRO",
          "alternateName": "Max TV Pro",
          "url": baseUrl,
          "logo": `${baseUrl}/Max-Tv-Pro-logo.png`,
          "description": "Premium IPTV service offering 4K and HD streaming with instant activation and 24/7 support",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+13322662387",
            "contactType": "customer service",
            "availableLanguage": ["English", "Arabic"]
          },
          "sameAs": [
            "https://wa.me/13322662387"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "1250",
            "bestRating": "5"
          }
        };
        
      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "MAX TV PRO IPTV Subscription",
          "description": "Premium IPTV streaming service with 4K quality, multi-device support, and 24/7 customer service",
          "brand": {
            "@type": "Brand",
            "name": "MAX TV PRO"
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "Monthly Plan",
              "price": "6",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01"
            },
            {
              "@type": "Offer",
              "name": "3 Month Plan",
              "price": "11",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01"
            },
            {
              "@type": "Offer",
              "name": "6 Month Plan",
              "price": "19",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01"
            },
            {
              "@type": "Offer",
              "name": "Yearly Plan",
              "price": "29",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01"
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "1250",
            "bestRating": "5"
          },
          "review": [
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "John Smith"
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "reviewBody": "Amazing service! The 4K quality is incredible and setup was so easy. Customer support helped me within minutes."
            },
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Ahmed Hassan"
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "reviewBody": "Best IPTV service I've used. Works perfectly on all my devices and the Arabic channels selection is excellent."
            }
          ]
        };
        
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MAX TV PRO",
          "url": baseUrl,
          "description": "Premium IPTV subscription service with 4K streaming, instant activation, and multi-device support",
          "inLanguage": [locale === 'ar' ? 'ar' : 'en'],
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        };
        
      case 'breadcrumb':
        return data;
        
      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I activate MAX TV PRO?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "After purchasing your subscription, you'll receive activation codes via WhatsApp or email. Enter these codes in the MAX TV PRO app to activate your service instantly."
              }
            },
            {
              "@type": "Question", 
              "name": "What devices support MAX TV PRO?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "MAX TV PRO works on Android, iOS, Smart TVs, Firestick, PC, Mac, and most streaming devices. Download the app from our website or use IPTV players like VLC."
              }
            },
            {
              "@type": "Question",
              "name": "Is there a free trial available?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer a 24-hour test period for new customers. Contact our support team via WhatsApp +13322662387 to request your trial access."
              }
            },
            {
              "@type": "Question",
              "name": "What's included in MAX TV PRO subscription?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Your subscription includes 4K/HD channels, sports, movies, TV shows, international content, EPG guide, catch-up TV, and 24/7 customer support."
              }
            }
          ]
        };
        
      case 'howto':
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Install MAX TV PRO APK",
          "description": "Step-by-step guide to download and install MAX TV PRO APK on Android devices",
          "image": `${baseUrl}/max-tv-pro-apk.png`,
          "totalTime": "PT5M",
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": "0"
          },
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "Android device"
            },
            {
              "@type": "HowToSupply", 
              "name": "Internet connection"
            }
          ],
          "step": [
            {
              "@type": "HowToStep",
              "name": "Enable Unknown Sources",
              "text": "Go to Settings > Security > Enable 'Unknown Sources' to allow APK installation",
              "image": `${baseUrl}/android-settings.png`
            },
            {
              "@type": "HowToStep",
              "name": "Download MAX TV PRO APK",
              "text": "Download the latest MAX TV PRO APK v6.0 from our official website",
              "url": `${baseUrl}/install`
            },
            {
              "@type": "HowToStep",
              "name": "Install the APK",
              "text": "Locate the downloaded APK file and tap to install. Follow the installation prompts."
            },
            {
              "@type": "HowToStep",
              "name": "Launch and Activate",
              "text": "Open MAX TV PRO app and enter your activation codes to start streaming"
            }
          ]
        };
        
      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data?.title || "MAX TV PRO IPTV Guide",
          "description": data?.description || "Complete guide for MAX TV PRO IPTV streaming service",
          "image": data?.image || `${baseUrl}/Max-Tv-Pro-logo.png`,
          "author": {
            "@type": "Organization",
            "name": "MAX TV PRO"
          },
          "publisher": {
            "@type": "Organization", 
            "name": "MAX TV PRO",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/Max-Tv-Pro-logo.png`
            }
          },
          "datePublished": data?.datePublished || "2024-01-01",
          "dateModified": data?.dateModified || new Date().toISOString().split('T')[0],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data?.url || baseUrl
          }
        };
        
      case 'image':
        return {
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "contentUrl": data?.url || `${baseUrl}/Max-Tv-Pro-logo.png`,
          "name": data?.name || "MAX TV PRO IPTV Application",
          "description": data?.description || "MAX TV PRO mobile application interface showing 4K streaming channels and user-friendly navigation",
          "author": {
            "@type": "Organization",
            "name": "MAX TV PRO"
          },
          "copyrightHolder": {
            "@type": "Organization",
            "name": "MAX TV PRO"
          },
          "width": data?.width || "300",
          "height": data?.height || "600",
          "encodingFormat": "image/png"
        };
        
      default:
        return null;
    }
  };

  const structuredData = getStructuredData();
  
  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}
