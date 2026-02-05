// WARNING: In a real production web application, `process.env` is not directly 
// available in the browser. These values would typically be injected during the
// build process (e.g., using Vite's `import.meta.env` or Webpack's `DefinePlugin`).
// We are using `process.env` here to follow the project's instructions and simulate
// a real environment where these keys are not hardcoded.

export const config = {
  api: {
    // Base URL for your backend API.
    baseUrl: '/api', 
  },
  // FIX: Added missing googleAdManager configuration required by useRewardedAd.ts
  googleAdManager: {
    // Example ad unit path for a rewarded ad.
    // In a real app, this would come from your Google Ad Manager account.
    adUnitPath: '/6355419/Travel/Europe/France/Paris',
  },
};