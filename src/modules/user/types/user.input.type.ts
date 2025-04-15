import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;
}
