import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GameModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  slug: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  developer: string;

  @Field(() => String, { nullable: true })
  publisher: string;

  @Field(() => String, { nullable: true })
  releaseDate: Date;

  @Field(() => String, { nullable: true })
  coverImageUrl: string;

  @Field(() => String, { nullable: true })
  trailerUrl: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
