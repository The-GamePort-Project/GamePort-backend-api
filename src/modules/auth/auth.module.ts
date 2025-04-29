import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService, PrismaService, UserService } from 'src/services';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './strategy/google.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    JwtService,
    ConfigService,
    GoogleStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
