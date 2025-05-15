/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

// model Game {
//   id            String   @id @default(uuid())
//   title         String
//   slug          String   @unique
//   description   String?
//   developer     String?
//   publisher     String
//   releaseDate   DateTime
//   coverImageUrl String?
//   trailerUrl    String?
//   rating        Float   @default(0.0)

//   genres    Genre[]     @relation("GameGenres")
//   platforms Platform[]  @relation("GamePlatforms")
//   reviews   Review[]
//   createdAt DateTime    @default(now())
//   updatedAt DateTime    @updatedAt
//   GameMedia GameMedia[]
// }

const users = [
  {
    firstname: 'John',
    lastname: 'Doe',
    username: 'johndoe_123',
    email: 'johndoe_123@hotmail.com',
    password: 'Password123',
  },
  {
    firstname: 'Jane',
    lastname: 'Doe',
    username: 'janedoe_123',
    email: 'janedoe_123@hotmail.com',
    password: 'Password123',
  },
  {
    firstname: 'Alice',
    lastname: 'Smith',
    username: 'alicesmith_123',
    email: 'alicesmith_123@hotmail.com',
    password: 'Password123',
  },
  {
    firstname: 'Bob',
    lastname: 'Johnson',
    username: 'bobjohnson_123',
    email: 'bobjohnson_123@hotmail.com',
    password: 'Password123',
  },
  {
    firstname: 'Charlie',
    lastname: 'Brown',
    username: 'charliebrown_123',
    email: 'charliebrown_123@hotmail.com',
    password: 'Password123',
  },
];

const games = [
  {
    title: 'Age of Empires III',
    slug: 'age-of-empires-iii',
    description:
      'Age of Empires III is a real-time strategy game that takes place during the European colonization of the Americas.',
    publisher: 'Microsoft Game Studios',
    coverImageUrl:
      'https://tagjofoworfmvcmstypl.supabase.co/storage/v1/object/public/gameport-game-images//age-of-empires-iii.jpg',
    releaseDate: new Date('2005-10-18'),
    trailerUrl: 'https://www.youtube.com/watch?v=AbArLUM3PRo',
    genres: {
      connectOrCreate: [
        {
          where: { name: 'Strategy' },
          create: { name: 'Strategy' },
        },
      ],
    },
    platforms: {
      connectOrCreate: [
        {
          where: { name: 'PC' },
          create: { name: 'PC' },
        },
      ],
    },
  },
  {
    title: 'Resident Evil Village',
    slug: 'resident-evil-village',
    description:
      'Resident Evil Village is a survival horror game where Ethan Winters searches for his kidnapped daughter in a mysterious European village.',
    publisher: 'Capcom',
    coverImageUrl:
      'https://tagjofoworfmvcmstypl.supabase.co/storage/v1/object/public/gameport-game-images/resident-evil-village.jpg',
    releaseDate: new Date('2021-05-07'),
    trailerUrl: 'https://www.youtube.com/watch?v=arEdruKxrQ8',
    genres: {
      connectOrCreate: [
        {
          where: { name: 'Horror' },
          create: { name: 'Horror' },
        },
        {
          where: { name: 'Action' },
          create: { name: 'Action' },
        },
      ],
    },
    platforms: {
      connectOrCreate: [
        {
          where: { name: 'PC' },
          create: { name: 'PC' },
        },
        {
          where: { name: 'Playstation 5' },
          create: { name: 'Playstation 5' },
        },
      ],
    },
  },
  {
    title: 'Clair Obscur: Expedition 33',
    slug: 'clair-obscur-expedition-33',
    description: 'Published by Kepler Interactive',
    publisher: 'Kepler Interactive',
    coverImageUrl:
      'https://tagjofoworfmvcmstypl.supabase.co/storage/v1/object/public/gameport-game-images//clair-obscur-expedition-33.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=wWGIakhqr5g',
    releaseDate: new Date('2025-04-24'),
    genres: {
      connectOrCreate: [
        {
          where: { name: 'RPG' },
          create: { name: 'RPG' },
        },
        {
          where: { name: 'Adventure' },
          create: { name: 'Adventure' },
        },
      ],
    },
    platforms: {
      connectOrCreate: [
        {
          where: { name: 'PC' },
          create: { name: 'PC' },
        },
        {
          where: { name: 'Playstation 5' },
          create: { name: 'Playstation 5' },
        },
        {
          where: { name: 'Xbox Series X' },
          create: { name: 'Xbox Series X' },
        },
      ],
    },
  },
  {
    title: 'Dark Souls 3',
    slug: 'dark-souls-3',
    description:
      'Dark Souls III is an action role-playing game set in a dark fantasy world, known for its challenging gameplay and intricate lore.',
    publisher: 'Bandai Namco Entertainment',
    coverImageUrl:
      'https://tagjofoworfmvcmstypl.supabase.co/storage/v1/object/public/gameport-game-images//dark-souls-3.jpg',
    releaseDate: new Date('2016-03-24'),
    trailerUrl: 'https://www.youtube.com/watch?v=cWBwFhUv1-8',
    genres: {
      connectOrCreate: [
        {
          where: { name: 'Action RPG' },
          create: { name: 'Action RPG' },
        },
        {
          where: { name: 'Adventure' },
          create: { name: 'Adventure' },
        },
      ],
    },
    platforms: {
      connectOrCreate: [
        {
          where: { name: 'PC' },
          create: { name: 'PC' },
        },
        {
          where: { name: 'Playstation 4' },
          create: { name: 'Playstation 4' },
        },
        {
          where: { name: 'Xbox One' },
          create: { name: 'Xbox One' },
        },
      ],
    },
  },
  {
    title: 'Divinity: Original Sin 2',
    slug: 'divinity-original-sin-2',
    description:
      'Divinity: Original Sin 2 is a critically acclaimed role-playing game set in a fantasy world, known for its deep storytelling and tactical combat.',
    publisher: 'Larian Studios',
    coverImageUrl:
      'https://tagjofoworfmvcmstypl.supabase.co/storage/v1/object/public/gameport-game-images//divinity-original-sin-2.jpg',
    releaseDate: new Date('2017-09-14'),
    trailerUrl: 'https://www.youtube.com/watch?v=bTWTFX8qzPI',
    genres: {
      connectOrCreate: [
        {
          where: { name: 'RPG' },
          create: { name: 'RPG' },
        },
        {
          where: { name: 'Adventure' },
          create: { name: 'Adventure' },
        },
        {
          where: { name: 'Strategy' },
          create: { name: 'Strategy' },
        },
      ],
    },
    platforms: {
      connectOrCreate: [
        {
          where: { name: 'PC' },
          create: { name: 'PC' },
        },
        {
          where: { name: 'Playstation 4' },
          create: { name: 'Playstation 4' },
        },
        {
          where: { name: 'Xbox One' },
          create: { name: 'Xbox One' },
        },
      ],
    },
  },
  {
    title: 'Blasphemous 2',
    slug: 'blasphemous-2',
    description:
      'Blasphemous 2 is a sequel to the critically acclaimed Metroidvania game, continuing the story of The Penitent One in a dark and twisted world.',
    publisher: 'Team17',
    coverImageUrl:
      'https://tagjofoworfmvcmstypl.supabase.co/storage/v1/object/public/gameport-game-images//blasphemous-2.jpg',
    releaseDate: new Date('2023-08-24'),
    trailerUrl: 'https://www.youtube.com/watch?v=8v0g1j7x2mE',
    genres: {
      connectOrCreate: [
        {
          where: { name: 'Metroidvania' },
          create: { name: 'Metroidvania' },
        },
        {
          where: { name: 'Action' },
          create: { name: 'Action' },
        },
      ],
    },
    platforms: {
      connectOrCreate: [
        {
          where: { name: 'PC' },
          create: { name: 'PC' },
        },
        {
          where: { name: 'Playstation 5' },
          create: { name: 'Playstation 5' },
        },
        {
          where: { name: 'Xbox Series X' },
          create: { name: 'Xbox Series X' },
        },
      ],
    },
  },
  {
    title: 'Elden Ring',
    slug: 'elden-ring',
    description:
      'Elden Ring is an action role-playing game set in a vast open world, known for its challenging gameplay and deep lore, created by FromSoftware and George R.R. Martin.',
    publisher: 'Bandai Namco Entertainment',
    coverImageUrl:
      'https://tagjofoworfmvcmstypl.supabase.co/storage/v1/object/public/gameport-game-images//elden-ring.jpg',
    releaseDate: new Date('2022-02-25'),
    trailerUrl: 'https://www.youtube.com/watch?v=AKXiKBnzpBQ',
    genres: {
      connectOrCreate: [
        {
          where: { name: 'Action RPG' },
          create: { name: 'Action RPG' },
        },
        {
          where: { name: 'Adventure' },
          create: { name: 'Adventure' },
        },
      ],
    },
    platforms: {
      connectOrCreate: [
        {
          where: { name: 'PC' },
          create: { name: 'PC' },
        },
        {
          where: { name: 'Playstation 5' },
          create: { name: 'Playstation 5' },
        },
        {
          where: { name: 'Xbox One' },
          create: { name: 'Xbox One' },
        },
      ],
    },
  },
  {
    title: 'Final Fantasy VII Remake',
    slug: 'final-fantasy-vii-remake',
    description:
      'Final Fantasy VII Remake is a reimagining of the classic RPG, featuring updated graphics, gameplay, and expanded story elements.',
    publisher: 'Square Enix',
    coverImageUrl:
      'https://tagjofoworfmvcmstypl.supabase.co/storage/v1/object/public/gameport-game-images//final-fantasy-vii-remake.jpg',
    releaseDate: new Date('2020-04-10'),
    trailerUrl: 'https://www.youtube.com/watch?v=sz9QWTcbXYE',
    genres: {
      connectOrCreate: [
        {
          where: { name: 'RPG' },
          create: { name: 'RPG' },
        },
        {
          where: { name: 'Action' },
          create: { name: 'Action' },
        },
      ],
    },
    platforms: {
      connectOrCreate: [
        {
          where: { name: 'PC' },
          create: { name: 'PC' },
        },
        {
          where: { name: 'Playstation 4' },
          create: { name: 'Playstation 4' },
        },
        {
          where: { name: 'Xbox One' },
          create: { name: 'Xbox One' },
        },
      ],
    },
  },
  {
    title: 'Ori and the Blind Forest',
    slug: 'ori-and-the-blind-forest',
    description:
      'Ori and the Blind Forest is a visually stunning platformer that tells the story of Ori, a guardian spirit, and Sein, the "Guardian of the Forest".',
    publisher: 'Xbox Game Studios',
    coverImageUrl:
      'https://tagjofoworfmvcmstypl.supabase.co/storage/v1/object/public/gameport-game-images//ori-and-the-blind-forest.jpg',

    releaseDate: new Date('2015-03-11'),
    trailerUrl: 'https://www.youtube.com/watch?v=cklw-Yu3moE',
    genres: {
      connectOrCreate: [
        {
          where: { name: 'Adventure' },
          create: { name: 'Adventure' },
        },
        {
          where: { name: 'Metroidvania' },
          create: { name: 'Metroidvania' },
        },
      ],
    },
    platforms: {
      connectOrCreate: [
        {
          where: { name: 'PC' },
          create: { name: 'PC' },
        },
        {
          where: { name: 'Xbox One' },
          create: { name: 'Xbox One' },
        },
      ],
    },
  },
  {
    title: 'Metroid Dread',
    slug: 'metroid-dread',
    description:
      'Metroid Dread is a side-scrolling action-adventure game that continues the story of Samus Aran as she faces a new threat on the planet ZDR.',
    publisher: 'Nintendo',
    coverImageUrl:
      'https://tagjofoworfmvcmstypl.supabase.co/storage/v1/object/public/gameport-game-images//metroid-dread.jpg',
    releaseDate: new Date('2021-10-08'),
    trailerUrl: 'https://www.youtube.com/watch?v=8v0g1j7x2mE',
    genres: {
      connectOrCreate: [
        {
          where: { name: 'Action' },
          create: { name: 'Action' },
        },
        {
          where: { name: 'Adventure' },
          create: { name: 'Adventure' },
        },
        {
          where: { name: 'Metroidvania' },
          create: { name: 'Metroidvania' },
        },
      ],
    },
    platforms: {
      connectOrCreate: [
        {
          where: { name: 'Nintendo Switch' },
          create: { name: 'Nintendo Switch' },
        },
      ],
    },
  },
];
async function main() {
  console.log('Clearing old data...');
  await prisma.user.deleteMany();
  await prisma.game.deleteMany();

  console.log('Creating users...');
  await Promise.all(
    users.map((user) =>
      prisma.user.create({
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          password: user.password,
        },
      }),
    ),
  );

  console.log('Creating games...');
  for (const game of games) {
    await prisma.game.create({ data: game });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
