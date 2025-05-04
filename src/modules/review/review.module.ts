import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services';
import { ReviewResolver } from './resolvers/review.resolver';
import { ReviewService } from './services/review.service';

@Module({
  providers: [PrismaService, ReviewService, ReviewResolver],
  exports: [ReviewService],
  controllers: [],
})
export class ReviewModule {}
