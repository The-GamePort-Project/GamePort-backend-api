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
  description?: string | null;

  @Field(() => String, { nullable: true })
  developer?: string | null;

  @Field(() => String, { nullable: true })
  publisher?: string | null;

  @Field(() => String, { nullable: true })
  releaseDate?: Date | null;

  @Field(() => String, { nullable: true })
  coverImageUrl?: string | null;

  @Field(() => String, { nullable: true })
  trailerUrl?: string | null;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | null;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
