import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [],
})
export class UserModule {}
