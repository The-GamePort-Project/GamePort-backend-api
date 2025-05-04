import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => String)
  comment: string;

  @Field(() => String)
  gameId: string;

  @Field(() => String)
  userId: string;

  @Field(() => Boolean)
  recommend: boolean;

  @Field(() => Number)
  overallRating: number;
}

@InputType()
export class GetReviewsForGameInput {
  @Field(() => String)
  gameId: string;

  @Field(() => Number, { nullable: true })
  take?: number;

  @Field(() => Number, { nullable: true })
  skip?: number;
}
