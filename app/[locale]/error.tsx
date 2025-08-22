'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto container-padding">
        <div className="h-16 w-16 rounded-full bg-error/10 flex items-center justify-center mx-auto">
          <AlertTriangle className="h-8 w-8 text-error" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Something went wrong!
          </h2>
          <p className="text-foreground-secondary">
            We apologize for the inconvenience. Please try again or contact our support team if the problem persists.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>
            Try again
          </Button>
          <Button variant="outline">
            <a href="/" className="block">
              Go home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
