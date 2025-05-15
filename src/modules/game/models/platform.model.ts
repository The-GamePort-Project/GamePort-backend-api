import { Field, ObjectType } from '@nestjs/graphql';
import { GameModel } from './game.model';
@ObjectType()
export class PlatformModel {
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => String)
  name: string;
  @Field(() => [GameModel], { nullable: true })
  games?: GameModel[];
}
