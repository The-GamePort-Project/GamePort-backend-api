import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GameModel } from '../models/game.model';
import { GameService } from 'src/services';
import {
  CreateGameInput,
  GetGamesPaginatedInput,
  GetGameInput,
} from '../dto/game.input';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql.auth.guard';
import { GenreModel } from '../models/genre.model';
import { GetGenresInput } from '../dto/genre.input';
@Resolver(() => GameModel)
export class GameResolver {
  constructor(private gameService: GameService) {}

  @Query(() => [GameModel])
  async games(
    @Args('data', { nullable: true }) data: GetGamesPaginatedInput,
  ): Promise<GameModel[]> {
    const games = await this.gameService.getGamesPaginated(
      { skip: data.skip, take: data.take },
      data.genreName,
    );
    return games;
  }

  @Query(() => GameModel)
  async game(@Args('data') data: GetGameInput): Promise<GameModel> {
    console.log('getGame');
    const game = await this.gameService.getGameByIdOrSlug(data);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }

  @Query(() => GameModel)
  @UseGuards(GqlAuthGuard)
  async getGameForReview(@Args('data') data: GetGameInput): Promise<GameModel> {
    const game = await this.gameService.getGameByIdOrSlug(data);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }
  @Query(() => [GenreModel])
  async genres(
    @Args('data', { nullable: true }) data?: GetGenresInput,
  ): Promise<GenreModel[]> {
    console.log('getGenres', data);
    const genres = await this.gameService.getAllGenres();
    if (!genres) {
      throw new NotFoundException('Genres not found');
    }
    return genres;
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
