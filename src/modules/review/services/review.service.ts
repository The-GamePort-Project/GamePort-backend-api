import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services';
import { CreateReviewInput } from '../dto/review.input';
import { UserService } from 'src/services';
@Injectable()
export class ReviewService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}
  async getAllReviews() {
    return this.prismaService.review.findMany({
      select: {
        id: true,
        comment: true,
        rating: true,
        recommend: true,
        game: {
          select: {
            id: true,
            title: true,
            slug: true,
            rating: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async getReviewById(id: string) {
    return this.prismaService.review.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        comment: true,
        rating: true,
        recommend: true,
        game: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async getReviewsByGameId(gameId: string) {
    return this.prismaService.review.findMany({
      where: {
        gameId,
      },
    });
  }
  async checkIfUserAlreadyReviewedGame(gameId: string, userId: string) {
    return this.prismaService.review.findFirst({
      where: {
        gameId,
        userId,
      },
    });
  }
  async createReview(data: CreateReviewInput, userId: string) {
    const { gameId, rating, ...rest } = data;

    const review = await this.prismaService.review.create({
      data: {
        rating: rating,
        ...rest,
        game: {
          connect: {
            id: gameId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    const aggregate = await this.prismaService.review.aggregate({
      where: {
        gameId,
      },
      _avg: {
        rating: true,
      },
    });
    const averageRating = aggregate._avg.rating ?? 0;

    await this.prismaService.game.update({
      where: {
        id: gameId,
      },
      data: {
        rating: averageRating,
      },
    });

    return review;
  }
}
