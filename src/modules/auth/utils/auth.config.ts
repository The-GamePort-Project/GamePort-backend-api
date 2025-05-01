//-todo- temporary fixa env

import { CookieOptions } from 'express';

export const AuthConfig = {
  SALT_ROUNDS: 10,
  JWT_SECRET: 'your-secret',
  TOKEN_EXPIRY: '1h',
};

export const cookieOptions: Record<string, CookieOptions> = {
  login: {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain: 'delightful-alfajores-1db8c9.netlify.app',

    maxAge: 24 * 60 * 60 * 1000,
    path: '/',
  },
  refreshToken: {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain: 'delightful-alfajores-1db8c9.netlify.app',

    path: '/auth/refresh',
  },
};
