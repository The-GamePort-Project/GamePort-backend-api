import { Module } from '@nestjs/common';
import { PrismaService, GameService } from 'src/services';

@Module({
  providers: [PrismaService, GameService],
  exports: [GameService],
  controllers: [],
})
export class GameModule {}
