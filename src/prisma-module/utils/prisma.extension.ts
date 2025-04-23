import { Prisma } from '@prisma/client';

export const slugExtension = Prisma.defineExtension({
  name: 'slugExtension',
  model: {
    game: {
      async createWithSlug(
        this: Prisma.TransactionClient,
        data: Prisma.GameCreateInput,
      ) {
        const slug: string = data.title.replace(/\s+/g, '-').toLowerCase();
        return await this.game.create({
          data: {
            ...data,
            slug,
          },
        });
      },
    },
  },
});
