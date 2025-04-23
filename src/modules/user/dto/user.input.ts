import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  firstname: string;

  @Field(() => String, { nullable: true })
  lastname: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  firstname?: string;
}

@InputType()
export class DeleteUserInput {
  @Field(() => String)
  id: string;
}
