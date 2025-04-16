import { Module } from '@nestjs/common';
import { UserService, PrismaService } from 'src/services';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  providers: [UserService, UserResolver, PrismaService],
  controllers: [],
})
export class UserModule {}
