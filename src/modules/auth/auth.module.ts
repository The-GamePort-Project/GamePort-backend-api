import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService, PrismaService, UserService } from 'src/services';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    JwtService,
    ConfigService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
