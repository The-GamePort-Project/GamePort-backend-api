import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GameModel } from '../models/game.model';
import { GameService } from 'src/services';
import { CreateGameInput, GetGamesPaginatedInput } from '../dto/game.input';

@Resolver(() => GameModel)
export class GameResolver {
  constructor(private gameService: GameService) {}

  @Query(() => [GameModel])
  async games(
    @Args('data', { nullable: true }) data: GetGamesPaginatedInput,
  ): Promise<GameModel[]> {
    const games = await this.gameService.getGamesPaginated(data);
    return games;
  }

  @Mutation(() => GameModel)
  async addGame(@Args('data') data: CreateGameInput): Promise<CreateGameInput> {
    const newGame = await this.gameService.createGame(data);
    return newGame;
  }
}
