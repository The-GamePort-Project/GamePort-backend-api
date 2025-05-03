import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';
import { GqlAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { UserService } from 'src/services';
import {
  CreateUserInput,
  DeleteUserInput,
  GetUsersPaginatedInput,
} from '../dto/user.input';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => String)
  sayHello(): string {
    return 'Hello GraphQL!';
  }

  @Query(() => [UserModel])
  @UseGuards(GqlAuthGuard)
  async getUsers(): Promise<UserModel[]> {
    const users = await this.userService.getAllUsers();
    console.log('getUsers', users.length);
    return users;
  }

  @Query(() => UserModel)
  @UseGuards(GqlAuthGuard)
  async getUsersPaginated(
    @Args('data') data: GetUsersPaginatedInput,
  ): Promise<UserModel[]> {
    const users = await this.userService.getUsersPaginated({
      pagination: data || null,
    });
    return users;
  }

  @Mutation(() => UserModel)
  async createUser(@Args('data') data: CreateUserInput): Promise<UserModel> {
    console.log('createUser', data);
    const newUser = await this.userService.createUser({ ...data });
    return newUser;
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('data') data: DeleteUserInput): Promise<boolean> {
    console.log('deleteUser', data);
    const deletedUser = await this.userService.deleteUser(data.id);
    return !!deletedUser;
  }
}
