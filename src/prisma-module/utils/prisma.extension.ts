import { Prisma } from '@prisma/client';
import slugify from 'slugify';

export const slugExtension = Prisma.defineExtension({
  name: 'slugExtension',
  model: {
    game: {
      async createWithSlug(
        this: Prisma.TransactionClient,
        data: Prisma.GameCreateInput,
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const slug = slugify(data.title, { lower: true });
        return await this.game.create({
          data: {
            ...data,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            slug,
          },
        });
      },
    },
  },
});
