//-todo- temporary fixa env

import { CookieOptions } from 'express';

export const AuthConfig = {
  SALT_ROUNDS: 10,
  JWT_SECRET: 'your-secret',
  TOKEN_EXPIRY: '1h',
};

export const cookieOptions: Record<string, CookieOptions> = {
  login: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain:
      process.env.NODE_ENV === 'production'
        ? 'delightful-alfajores-1db8c9.netlify.app'
        : undefined,

    maxAge: 24 * 60 * 60 * 1000,
    path: '/',
  },
  refreshToken: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain:
      process.env.NODE_ENV === 'production'
        ? 'delightful-alfajores-1db8c9.netlify.app'
        : undefined,

    path: '/auth/refresh',
  },
};
