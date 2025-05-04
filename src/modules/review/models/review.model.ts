import { ObjectType, Field } from '@nestjs/graphql';
import { UserModel } from 'src/modules/user/models/user.model';
import { GameModel } from 'src/modules/game/models/game.model';
@ObjectType()
export class ReviewModel {
  @Field(() => String, { nullable: true })
  gameId?: string;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => Number)
  rating: number;

  @Field(() => String, { nullable: true })
  comment?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | null;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;

  @Field(() => GameModel, { nullable: true })
  game?: GameModel;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;
}
