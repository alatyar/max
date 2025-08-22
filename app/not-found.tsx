import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold text-accent">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-foreground-secondary max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">
              Go Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </Link>
        </div>
        
        <div className="pt-8">
          <p className="text-sm text-muted">
            Need help? Contact us at{' '}
            <a 
              href="mailto:support@maxprotv.com" 
              className="text-accent hover:underline"
            >
              support@maxprotv.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
