import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name: string | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
