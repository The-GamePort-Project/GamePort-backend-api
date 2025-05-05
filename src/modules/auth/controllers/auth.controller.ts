import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  HttpCode,
  UnauthorizedException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginInput } from '../dto/auth.input';
import { GoogleOauthGuard } from '../guards/google.auth.guard';
import { IGoogleUser } from 'src/models';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginInput) {
    const { accessToken, refreshToken } =
      await this.authService.validateUser(loginDto);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const googleUser: IGoogleUser = req.user as IGoogleUser;

    const tokens = await this.authService.handleGoogleUser(googleUser);
    let allowed_origin = this.config.get<string>('ALLOWED_ORIGIN');
    if (!allowed_origin || !allowed_origin.length) {
      allowed_origin = this.config.get<string>('ALLOWED_ORIGIN_DEV');
    }
    res.redirect(
      `${allowed_origin}?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`,
    );
  }
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    console.log('refreshing accessToken...');
    if (!token) throw new UnauthorizedException('Missing refresh token');
    const newAccessToken = await this.authService.refreshAccessToken(token);
    return newAccessToken;
  }
}
