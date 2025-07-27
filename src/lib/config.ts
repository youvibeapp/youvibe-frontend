export const apiConfig = {
  fastApiBaseUrl: process.env.FASTAPI_BASE_URL || 'http://localhost:8000',
  fastApiKey: process.env.FASTAPI_API_KEY || 'test-key',
  isDev: process.env.NODE_ENV === 'development',
};

export const endpoints = {
  analyze: '/analyze/',
  generate: '/generate/',
  celebrityMatch: '/celebrity-match/',
  health: '/',
} as const;
