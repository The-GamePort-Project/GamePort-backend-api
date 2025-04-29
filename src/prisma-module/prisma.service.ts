import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { slugExtension } from './utils/prisma.extension';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    this.$extends(slugExtension);
  }
  async onModuleInit() {
    const maxRetries = 5;
    const retryDelay = 3000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await this.$connect();
        console.log('✅ Connected to Prisma database!');
        break;
      } catch (error: any) {
        console.error(`❌ Prisma connection attempt ${attempt} failed.`, error);
        if (attempt === maxRetries) {
          console.error('💥 Max retries reached. Exiting.');
          process.exit(1);
        }
        await new Promise((res) => setTimeout(res, retryDelay));
      }
    }
    await this.game
      .findFirst({
        where: {
          genres: {
            some: {
              name: 'Action',
            },
          },
        },
      })
      .then((game) => {
        console.log('Game found:', game);
      })
      .catch((error) => {
        console.error('Error finding game:', error);
      });
  }
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Disconnected successfully!');
  }
}
