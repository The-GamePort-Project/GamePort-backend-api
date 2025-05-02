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

  @Field(() => String)
  provider: string;

  @Field(() => String, { nullable: true })
  googleId?: string | null;

  @Field(() => String)
  role: string;

  @Field(() => [String], { nullable: true })
  reviews?: string[] | null;
}
// model User {
//   id        String   @id @default(uuid())
//   username  String   @unique
//   email     String   @unique
//   firstname String?
//   lastname  String?
//   password  String?
//   provider  String   @default("local")
//   googleId  String?  @unique
//   role      Role     @default(USER)
//   reviews   Review[]
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }
