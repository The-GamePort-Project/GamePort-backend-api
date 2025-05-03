import { PrismaService } from 'src/services';
import { Injectable } from '@nestjs/common';
import { CreateGameInput } from '../dto/game.input';
import slugify from 'slugify';
@Injectable()
export class GameService {
  constructor(private prismaService: PrismaService) {}

  getGamesPaginated(
    pagination: { skip?: number; take?: number } = { skip: 0, take: 10 },
  ) {
    return this.prismaService.game.findMany({
      ...pagination,
      orderBy: {
        createdAt: 'desc',
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
}
