import { PrismaService, UserService } from 'src/services';
import { comparePasswords } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/models';
import { ConfigService } from '@nestjs/config';
import { IGoogleUser } from 'src/models';
import { LoginInput } from '../dto/auth.input';
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

  async validateUser(loginDto: LoginInput) {
    const { username, email, password } = loginDto;

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

    if (user.provider !== 'local') {
      console.log('User not local');
      throw new UnauthorizedException(`Please log in using ${user.provider}`);
    }

    const isPasswordValid = await comparePasswords(
      password,
      user.password as string,
    );

    if (!isPasswordValid) {
      console.log('Invalid password');
      throw new UnauthorizedException('Invalid credentials');
    }

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

  async refreshAccessToken(refreshToken: string) {
    const payload: IJwtPayload = this.jwt.verify(refreshToken);

    if (!payload.sub) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.getUserById(payload.sub.id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const newAccessToken = this.generateAccessToken(user.id);
    return { accessToken: newAccessToken };
  }

  refreshTokens(refreshToken: string) {
    const payload: IJwtPayload = this.jwt.verify(refreshToken);

    if (!payload.sub) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newAccessToken = this.generateAccessToken(payload.sub.id);
    const newRefreshToken = this.generateRefreshToken(payload.sub.id);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async handleGoogleUser(googleUser: IGoogleUser) {
    const user = await this.userService.findOrCreateGoogleUser(googleUser);

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }
  generateAccessToken(userId: string) {
    return this.jwt.sign(
      { sub: userId },
      { expiresIn: this.accessTokenExp, secret: this.jwtSecret },
    );
  }
  generateRefreshToken(userId: string) {
    return this.jwt.sign(
      { sub: userId },
      { expiresIn: this.refreshTokenExp, secret: this.jwtRefreshSecret },
    );
  }
}
