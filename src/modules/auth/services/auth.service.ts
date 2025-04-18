import { PrismaService } from 'src/services';
import { comparePasswords } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
import { AuthAndSecurity } from 'src/models';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
  ) {}

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

    let user: User | null = null;

    if (username) {
      user = await this.prismaService.user.findUnique({
        where: { username },
      });
    } else {
      user = await this.prismaService.user.findUnique({
        where: { email },
      });
    }

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwt.sign(
      { sub: user.id },
      { expiresIn: AuthAndSecurity.ACCESS_TOKEN_EXPIRATION },
    );
    const refreshToken = this.jwt.sign(
      { sub: user.id },
      { expiresIn: AuthAndSecurity.REFRESH_TOKEN_EXPIRATION },
    );

    return { accessToken, refreshToken };
  }
}
