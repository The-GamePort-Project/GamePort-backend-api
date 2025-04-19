import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  firstname: string | null;

  @Field(() => String, { nullable: true })
  lastname: string | null;

  @Field(() => String)
  username: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
