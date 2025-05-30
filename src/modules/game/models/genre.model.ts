import { ObjectType, Field } from '@nestjs/graphql';
import { GameModel } from './game.model';
@ObjectType()
export class GenreModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [GameModel], { nullable: true })
  games?: GameModel[];
}
