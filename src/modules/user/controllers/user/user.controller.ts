import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: { email: string; name?: string }) {
    return this.userService.createUser(body.email, body.name);
  }

  // Endpoint to delete a user by ID
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
