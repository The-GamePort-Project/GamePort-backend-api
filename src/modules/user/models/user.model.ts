import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
