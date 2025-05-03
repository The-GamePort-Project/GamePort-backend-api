import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email!: string;

  @Field(() => String, { nullable: true })
  firstname?: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => String)
  username!: string;

  @Field(() => String, { nullable: true })
  password?: string;
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

@InputType()
export class GetUserInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class GetUsersPaginatedInput {
  @Field(() => Number, { nullable: true })
  take?: number;

  @Field(() => Number, { nullable: true })
  skip?: number;
}
