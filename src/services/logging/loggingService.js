import * as Sentry from '@sentry/react';

// Custom logging function for gameplay events
const logGameplayError = (error) => {
    Sentry.captureException(error);
};

const logGameplayEvent = (event) => {
    Sentry.captureMessage(`Gameplay Event: ${event}`);
};

export { logGameplayError, logGameplayEvent };