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

  async createReview(data: CreateReviewInput, userId: string) {
    const { gameId, rating, ...rest } = data;

    return this.prismaService.review.create({
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
  }
}
