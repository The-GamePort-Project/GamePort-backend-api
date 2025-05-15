import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  developer: string | null;

  @Field(() => String)
  publisher: string;

  @Field(() => String)
  slug: string;

  @Field(() => Date)
  releaseDate: Date;

  @Field(() => String, { nullable: true })
  coverImageUrl: string | null;

  @Field(() => String, { nullable: true })
  trailerUrl: string | null;
}

@InputType()
export class GetGamesPaginatedInput {
  @Field(() => Number, { nullable: true })
  take?: number;

  @Field(() => Number, { nullable: true })
  skip?: number;

  @Field(() => String, { nullable: true })
  genreName?: string;
}

@InputType()
export class GetGameInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  slug?: string;
}
