import React from 'react';
import * as Sentry from '@sentry/react';

// Setup Sentry for logging errors
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
});

const ErrorBoundary = ({ children }) => {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetErrorBoundary }) => (
        <div>
          <h1>Something went wrong:</h1>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default ErrorBoundary;