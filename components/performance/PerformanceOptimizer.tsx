'use client';

import { useEffect } from 'react';

interface PerformanceOptimizerProps {
  enablePreload?: boolean;
  enablePrefetch?: boolean;
}

export function PerformanceOptimizer({ 
  enablePreload = true, 
  enablePrefetch = true 
}: PerformanceOptimizerProps) {
  
  useEffect(() => {
    // Preload critical resources
    if (enablePreload) {
      // Preload critical images (only existing ones)
      const criticalImages = [
        '/Max-Tv-Pro-logo.png',
        '/max-tv-pro_.png',
        '/max-tv-pro-apk.png'
      ];  
      
      criticalImages.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
        document.head.appendChild(link);
      });
    }

    // Prefetch next pages
    if (enablePrefetch) {
      const prefetchPages = [
        '/plans',
        '/install',
        '/contact'
      ];
      
      prefetchPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });
    }

    // Optimize images with intersection observer
    let imageObserver: IntersectionObserver | null = null;
    
    try {
      const images = document.querySelectorAll('img[loading="lazy"]');
      imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver?.unobserve(img);
            }
          }
        });
      });

      images.forEach(img => imageObserver?.observe(img));
    } catch (error) {
      console.error('PerformanceOptimizer error:', error);
    }

    // Cleanup function
    return () => {
      imageObserver?.disconnect();
    };
  }, [enablePreload, enablePrefetch]);

  return (
    <>
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//wa.me" />
      
      {/* Preconnect to critical origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Critical CSS inline for above-the-fold content */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .hero-gradient { background: linear-gradient(135deg, #FF5722 0%, #2D9CDB 100%); }
          .container-padding { padding-left: 1rem; padding-right: 1rem; }
          @media (min-width: 768px) { .container-padding { padding-left: 2rem; padding-right: 2rem; } }
        `
      }} />
    </>
  );
}
