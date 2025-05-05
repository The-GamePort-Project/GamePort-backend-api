/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old data...');
  await prisma.user.deleteMany();
  await prisma.game.deleteMany();

  console.log('Creating users...');
  await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.user.create({
        data: {
          firstname: faker.person.firstName(),
          lastname: faker.person.lastName(),
          username: faker.internet.username(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      }),
    ),
  );

  console.log('Creating games...');
  const genres = [
    ['Action', 'Adventure'],
    ['Action', 'Role-playing'],
    ['Action', 'Simulation'],
    ['Action', 'Strategy'],
    ['Action', 'Sports'],
  ];
  await Promise.all(
    genres.map((genres: string[]) =>
      prisma.game.create({
        data: {
          title: faker.word.words(3),
          slug: slugify(faker.word.words(3), { lower: true }),
          description: faker.lorem.paragraph(),
          developer: faker.company.name(),
          publisher: faker.company.name(),
          releaseDate: faker.date.past(),
          genres: {
            connect: genres.map((genre) => ({ name: genre })),
          },
          trailerUrl: 'https://www.youtube.com/watch?v=0sdNNeaIqT8',
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
