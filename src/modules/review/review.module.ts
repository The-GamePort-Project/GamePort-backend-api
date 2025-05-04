import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services';
import { ReviewResolver } from './resolvers/review.resolver';
import { ReviewService } from './services/review.service';
import { UserService } from 'src/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [PrismaService, ReviewService, ReviewResolver, UserService],
  exports: [ReviewService],
  controllers: [],
})
export class ReviewModule {}
