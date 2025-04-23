import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String)
  developer: string;

  @Field(() => String)
  publisher: string;

  @Field(() => Date)
  releaseDate: Date;

  @Field(() => String, { nullable: true })
  coverImageUrl: string;

  @Field(() => String, { nullable: true })
  trailerUrl: string;
}
