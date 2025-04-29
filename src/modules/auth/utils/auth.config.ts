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
    sameSite: 'lax',
    domain:
      process.env.NODE_ENV === 'production' ? 'yourdomain.com' : undefined,
    maxAge: 24 * 60 * 60 * 1000,
  },
  refreshToken: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/auth/refresh',
  },
};
