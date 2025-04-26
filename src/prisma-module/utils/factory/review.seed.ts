// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// // prisma/seed.ts
// import { PrismaClient } from '@prisma/client';
// import slugify from 'slugify';
// import { faker } from '@faker-js/faker';

// const prisma = new PrismaClient();

// async function main() {
//   console.log('Clearing old data...');

//   await prisma.review.deleteMany();

//   console.log('Creating reviews...');
//   await Promise.all(
//     Array.from({ length: 10 }).map(() =>
//       prisma.review.create({
//         data: {
//           rating: Math.floor(Math.random() * 5) + 1,
//         },
//       }),
//     ),
//   );

//   console.log('✅ Seed complete');
// }
