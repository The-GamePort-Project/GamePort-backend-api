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
    secure: true,
    sameSite: 'none',
    domain:
      process.env.NODE_ENV === 'production' ? 'yourdomain.com' : 'localhost',
    maxAge: 24 * 60 * 60 * 1000,
    path: '/',
  },
  refreshToken: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/auth/refresh',
  },
};
