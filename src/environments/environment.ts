export const environment = {
  production: process.env.NODE_ENV === 'production',
  posthogKey: process.env.NG_APP_POSTHOG_PROJECT_TOKEN || '',
  posthogHost: process.env.NG_APP_POSTHOG_HOST || ''
};
