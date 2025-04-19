import { PrismaService, UserService } from 'src/services';
import { comparePasswords } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/models';
import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
@Injectable()
export class AuthService {
  private refreshTokenExp: string | undefined;
  private accessTokenExp: string | undefined;
  private jwtSecret: string | undefined;
  private jwtRefreshSecret: string | undefined;

  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private userService: UserService,
    private config: ConfigService,
  ) {
    this.accessTokenExp = this.config.get<string>('JWT_ACCESS_EXPIRATION');
    this.refreshTokenExp = this.config.get<string>('JWT_REFRESH_EXPIRATION');
    this.jwtSecret = this.config.get<string>('JWT_SECRET');
    this.jwtRefreshSecret = this.config.get<string>('JWT_REFRESH_SECRET');
  }

  async validateUser({
    username,
    email,
    password,
  }: {
    username?: string;
    email?: string;
    password: string;
  }) {
    if ((!username && !email) || !password) {
      throw new BadRequestException('Provide correct credentials.');
    }
    if (username && email) {
      throw new BadRequestException('Provide either username or email.');
    }
    const user = await this.userService.getUserByUsernameOrEmail({
      username,
      email,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('user', user);
    const accessToken = this.jwt.sign(
      { sub: user.id },
      { expiresIn: this.accessTokenExp, secret: this.jwtSecret },
    );
    const refreshToken: string = this.jwt.sign(
      { sub: user.id },
      { expiresIn: this.refreshTokenExp, secret: this.jwtRefreshSecret },
    );

    return { accessToken, refreshToken };
  }

  refreshTokens(refreshToken: string) {
    const payload: IJwtPayload = this.jwt.verify(refreshToken);

    if (!payload.sub) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newAccessToken: string = this.jwt.sign(
      { sub: payload.sub },
      { expiresIn: this.accessTokenExp, secret: this.jwtSecret },
    );
    const newRefreshToken: string = this.jwt.sign(
      { sub: payload.sub },
      { expiresIn: this.refreshTokenExp, secret: this.jwtRefreshSecret },
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
