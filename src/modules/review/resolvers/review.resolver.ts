import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewModel } from '../models/review.model';
import { ReviewService } from '../services/review.service';
import { CreateReviewInput, GetReviewsForGameInput } from '../dto/review.input';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => ReviewModel)
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}
  @Query(() => [ReviewModel])
  async getReviewsForGame(
    @Args('data') data: GetReviewsForGameInput,
  ): Promise<ReviewModel[]> {
    const reviews = await this.reviewService.getReviewsByGameId(data.gameId);
    return reviews;
  }

  @Mutation(() => ReviewModel)
  async createReview(
    @Args('data') data: CreateReviewInput,
  ): Promise<ReviewModel> {
    if (!data.gameId || !data.userId) {
      throw new BadRequestException('Game ID and User ID are required');
    }
    const review = await this.reviewService.createReview(data);
    return review;
  }
}
