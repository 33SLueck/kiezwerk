'use client';

import * as React from 'react';
import { Button, Heading, Text, Card } from '@repo/ui';

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  React.useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 text-center space-y-6 border border-border bg-card shadow-sm">
        <div className="space-y-2">
          <Heading level={2} size="md" className="text-foreground">
            Something went wrong
          </Heading>
          <Text as="p" className="text-sm text-muted-foreground">
            An unexpected error occurred. Please try again or return to the homepage.
          </Text>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <Button variant="secondary" onClick={() => (window.location.href = '/')}>
            Go Home
          </Button>
          <Button variant="primary" onClick={() => reset()}>
            Try Again
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ErrorBoundary;
