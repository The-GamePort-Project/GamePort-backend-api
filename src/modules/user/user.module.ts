import { Module } from '@nestjs/common';
import { UserService, PrismaService } from 'src/services';
import { UserResolver } from './resolvers/user.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [UserService, UserResolver, PrismaService],
  exports: [UserService],
  controllers: [],
})
export class UserModule {}
