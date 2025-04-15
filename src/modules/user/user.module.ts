import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { UserController } from './controllers/user/user.controller';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
