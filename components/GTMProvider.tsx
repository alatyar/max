'use client';

import * as React from 'react';
import { initializeGTM, initializeScrollTracking } from '@/lib/analytics';

interface GTMProviderProps {
  gtmId: string;
  children: React.ReactNode;
}

export function GTMProvider({ gtmId, children }: GTMProviderProps) {
  React.useEffect(() => {
    // Initialize GTM
    initializeGTM(gtmId);
    
    // Initialize scroll tracking
    const cleanup = initializeScrollTracking();
    
    return cleanup;
  }, [gtmId]);

  return (
    <>
      {/* GTM NoScript */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      {children}
    </>
  );
}
