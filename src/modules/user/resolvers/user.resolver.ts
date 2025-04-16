import { Resolver, Query } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';
import { UserService } from 'src/services';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => String)
  sayHello(): string {
    return 'Hello GraphQL!';
  }

  @Query(() => UserModel)
  async getUsers(): Promise<UserModel[]> {
    const users = await this.userService.getAllUsers();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  @Query(() => UserModel)
  async createUser(): Promise<void> {}
}
