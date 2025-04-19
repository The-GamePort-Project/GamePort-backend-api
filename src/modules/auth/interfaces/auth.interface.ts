export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}
export interface IJwtPayload {
  sub: {
    id: string;
  };
  iat?: number;
  exp?: number;
}
