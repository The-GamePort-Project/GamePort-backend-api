import { PrismaService } from 'src/services';
import { Injectable } from '@nestjs/common';
import { CreateGameInput, GetGameInput } from '../dto/game.input';
import slugify from 'slugify';
@Injectable()
export class GameService {
  constructor(private prismaService: PrismaService) {}

  getGamesPaginated(
    pagination: { skip?: number; take?: number } = { skip: 0, take: 10 },
    genreName?: string,
  ) {
    return this.prismaService.game.findMany({
      ...pagination,
      orderBy: {
        createdAt: 'desc',
      },
      where: genreName
        ? {
            genres: {
              some: {
                name: genreName,
              },
            },
          }
        : undefined,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        developer: true,
        publisher: true,
        releaseDate: true,
        coverImageUrl: true,
        trailerUrl: true,
        rating: true,
        genres: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  //Todo handle slug errors.
  createGame(data: CreateGameInput) {
    const slug: string = slugify(data.title, { lower: true });
    return this.prismaService.game.create({
      data: {
        ...data,
        slug,
      },
    });
  }

  getGameByIdOrSlug(data: GetGameInput) {
    const { id, slug } = data;
    return this.prismaService.game.findUnique({
      where: {
        id: id || undefined,
        slug: slug || undefined,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        developer: true,
        publisher: true,
        releaseDate: true,
        coverImageUrl: true,
        rating: true,
        genres: true,
      },
    });
  }

  getGameWithHighestRating() {
    return this.prismaService.game.findFirst({
      orderBy: {
        rating: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        developer: true,
        publisher: true,
        releaseDate: true,
        coverImageUrl: true,
        trailerUrl: true,
        rating: true,
        genres: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  getGameForReviewBySlug(slug: string) {
    return this.prismaService.game.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        title: true,
        coverImageUrl: true,
        rating: true,
        genres: true,
      },
    });
  }

  getAllGenres() {
    return this.prismaService.genre.findMany();
  }
}
