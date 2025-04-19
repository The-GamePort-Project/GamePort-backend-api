import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginInput } from '../dto/auth.input';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.validateUser(loginDto);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return { accessToken };
  }

  @Post('refresh')
  @HttpCode(200)
  refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cookies = req.cookies as Record<string, string>;
    const refreshToken: string = cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token found');
    }

    const tokens = this.authService.refreshTokens(refreshToken);

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return { accessToken: tokens.accessToken };
  }
}
