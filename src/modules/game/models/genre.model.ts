import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GenreModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}
