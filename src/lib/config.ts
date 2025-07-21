export const apiConfig = {
  // Use local API route for security (API key stays server-side)
  fastApiBaseUrl: '/api/backend',
  isDev: process.env.NODE_ENV === 'development',
};

export const endpoints = {
  analyze: '/analyze/',
  generate: '/generate/',
  health: '/',
} as const;
