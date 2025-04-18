import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';
import { UserService } from 'src/services';
import { CreateUserInput } from '../dto/user.input';
import { DeleteUserInput } from '../dto/user.input';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => String)
  sayHello(): string {
    return 'Hello GraphQL!';
  }

  @Query(() => [UserModel])
  async getUsers(): Promise<UserModel[]> {
    const users = await this.userService.getAllUsers();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      firstname: user.firstname ?? '',
      lastname: user.lastname ?? '',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  @Mutation(() => UserModel)
  async createUser(@Args('data') data: CreateUserInput): Promise<UserModel> {
    return await this.userService.createUser({
      ...data,
      firstname: data.firstname || '',
      lastname: data.lastname || '',
    });
  }

  @Mutation(() => UserModel)
  async deleteUser(@Args('data') data: DeleteUserInput): Promise<boolean> {
    const deletedUser = await this.userService.deleteUser(data.id);
    return !!deletedUser;
  }
}
