import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';
import { CreateGameInput } from 'src/modules/game/dto/game.input';
export const extendedPrismaClient = new PrismaClient().$extends({
  model: {
    user: {
      findByEmail: async (email: string) => {
        return extendedPrismaClient.user.findFirstOrThrow({ where: { email } });
      },
    },
    game: {
      createWithSlug: async (data: CreateGameInput) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const slug = slugify(data.title, { lower: true });
        return await extendedPrismaClient.game.create({
          data: {
            ...data,
            slug,
          },
        });
      },
    },
  },
});

export type ExtendedPrismaClient = typeof extendedPrismaClient;
