import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  name?: string;
}

@InputType()
export class DeleteUserInput {
  @Field(() => String)
  id: string;
}
