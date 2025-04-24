import { Resolver, Query, Args } from '@nestjs/graphql';
import { GameModel } from '../models/game.model';
import { GameService, PrismaService } from 'src/services';

@Resolver(() => GameModel)
export class GameResolver {
  constructor(private gameService: GameService) {}
  @Query(() => [GameModel])
  async games(
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take = 10,
  ): Promise<Game[]> {}
}
