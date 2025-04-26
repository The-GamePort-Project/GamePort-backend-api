import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GameModel } from '../models/game.model';
import { GameService } from 'src/services';
import { CreateGameInput } from '../dto/game.input';

@Resolver(() => GameModel)
export class GameResolver {
  constructor(private gameService: GameService) {}
  @Query(() => [GameModel])
  async games(
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take = 10,
  ): Promise<GameModel[]> {
    const games = await this.gameService.getGamesPaginated({
      skip,
      take,
    });
    return games;
  }

  @Mutation(() => CreateGameInput)
  async addGame(@Args('data') data: CreateGameInput): Promise<CreateGameInput> {
    const newGame = await this.gameService.createGame(data);
    return newGame;
  }
}
