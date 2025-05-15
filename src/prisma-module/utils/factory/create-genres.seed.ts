/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const genres = [
  'Action',
  'Adventure',
  'RPG',
  'Strategy',
  'Sports',
  'Puzzle',
  'Horror',
  'Racing',
  'Platformer',
];

const platforms = [
  'PC',
  'PlayStation 4',
  'PlayStation 5',
  'Xbox One',
  'Xbox Series X/S',
  'Nintendo Switch',
];
async function main() {
  console.log('Clearing old data...');

  await prisma.genre.deleteMany();

  console.log('Creating genres...');
  await Promise.all(
    genres.map((genre) =>
      prisma.genre.create({
        data: {
          name: genre,
        },
      }),
    ),
  );

  await Promise.all(
    platforms.map((platform) =>
      prisma.platform.create({
        data: {
          name: platform,
        },
      }),
    ),
  );

  console.log('✅ Seed complete');
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
//run this: dotenv -e .env.development ts-node src/prisma-module/utils/factory/create-genres.seed.ts
