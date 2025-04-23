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
    await this.$connect();
    console.log('Connected successfully!');
  }
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Disconnected successfully!');
  }
}
