export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}
export interface IJwtPayload {
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}
export interface IGoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  googleId: string;
  name: string;
}
