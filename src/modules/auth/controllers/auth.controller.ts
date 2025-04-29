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
import { cookieOptions } from 'src/utils';
import { IGoogleUser } from 'src/models';

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

    res.cookie('refreshToken', refreshToken, cookieOptions.login);

    return { accessToken };
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const googleUser: IGoogleUser = req.user as IGoogleUser;

    // Call handleGoogleUser only once
    const tokens = await this.authService.handleGoogleUser(googleUser);
    console.log('tokens', tokens);
    // Set the refresh token as a cookie
    res.cookie('refreshToken', tokens.refreshToken, cookieOptions.refreshToken);

    // Redirect to the front-end with the access token in the URL
    res.redirect(`http://localhost:3000?accessToken=${tokens.accessToken}`);
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

    res.cookie(
      'refresh_token',
      tokens.refreshToken,
      cookieOptions.refreshToken,
    );

    return { accessToken: tokens.accessToken };
  }
}
