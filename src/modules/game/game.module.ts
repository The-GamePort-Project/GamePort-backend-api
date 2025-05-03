import { Module } from '@nestjs/common';
import { PrismaService, GameService } from 'src/services';
import { GameResolver } from './resolvers/game.resolver';

@Module({
  providers: [PrismaService, GameService, GameResolver],
  exports: [GameService],
  controllers: [],
})
export class GameModule {}
