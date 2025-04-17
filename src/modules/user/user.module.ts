import { Module } from '@nestjs/common';
import { UserService, PrismaService } from 'src/services';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  providers: [UserService, UserResolver, PrismaService],
  exports: [UserService],
  controllers: [],
})
export class UserModule {}
