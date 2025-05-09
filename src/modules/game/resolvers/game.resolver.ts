import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GameModel } from '../models/game.model';
import { GameService } from 'src/services';
import {
  CreateGameInput,
  GetGamesPaginatedInput,
  GetGameInput,
} from '../dto/game.input';
import { NotFoundException } from '@nestjs/common';

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

  @Query(() => GameModel)
  async game(@Args('data') data: GetGameInput): Promise<GameModel> {
    const game = await this.gameService.getGameByIdOrSlug(data);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }
  @Query(() => GameModel)
  async getHighestRatedGame(): Promise<GameModel | null> {
    return await this.gameService.getGameWithHighestRating();
  }
  @Mutation(() => GameModel)
  async addGame(@Args('data') data: CreateGameInput): Promise<CreateGameInput> {
    const newGame = await this.gameService.createGame(data);
    return newGame;
  }
}
