import { Resolver, Query } from '@nestjs/graphql';
import { GameModel } from '../models/game.model';
import { GameService } from 'src/services';

@Resolver(() => GameModel)
export class GameResolver {
  constructor(private gameService: GameService) {}
  //   @Query(() => [GameModel])
  //   async games(): Promise<GameModel[]> {
  //     return this.gameService.getGamesPaginated();
  //   }
}
