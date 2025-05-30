import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewModel } from '../models/review.model';
import { ReviewService } from '../services/review.service';
import { CreateReviewInput, GetReviewsForGameInput } from '../dto/review.input';
import { BadRequestException } from '@nestjs/common';
import { CurrentUser } from 'src/modules/auth/decorators/currentUser';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql.auth.guard';
import { UserModel } from 'src/modules/user/models/user.model';

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

  @Query(() => [ReviewModel])
  getAllReviews(): Promise<ReviewModel[]> {
    return this.reviewService.getAllReviews();
  }

  @Mutation(() => ReviewModel)
  @UseGuards(GqlAuthGuard)
  async createReview(
    @Args('data') data: CreateReviewInput,
    @CurrentUser() user: UserModel,
  ): Promise<ReviewModel> {
    if (!data.gameId) {
      throw new BadRequestException('Game ID are required');
    }
    if (!user.id) {
      console.log('User ID is missing');
      throw new BadRequestException('User ID is required');
    }
    const alreadyReviewed =
      await this.reviewService.checkIfUserAlreadyReviewedGame(
        data.gameId,
        user.id,
      );
    if (alreadyReviewed) {
      throw new BadRequestException('User already reviewed this game');
    }
    const review = await this.reviewService.createReview(data, user.id);
    return review;
  }
}
