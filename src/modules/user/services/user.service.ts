import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { handlePrismaError, hashPassword } from 'src/utils';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Create a new user in the database
  async createUser({
    email,
    firstname,
    lastname,
    username,
    password,
  }: {
    email: string;
    firstname?: string;
    lastname?: string;
    username: string;
    password: string;
  }) {
    try {
      const hashedPassword = await hashPassword(password);
      return await this.prisma.user.create({
        data: {
          email,
          firstname,
          lastname,
          username,
          password: hashedPassword,
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // Delete a user by ID
  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserByUsernameOrEmail({
    username,
    email,
  }: {
    username?: string;
    email?: string;
  }): Promise<User | null> {
    let user: User | null = null;
    if (username) {
      user = await this.prisma.user.findUnique({
        where: { username },
      });
    } else {
      user = await this.prisma.user.findUnique({
        where: { email },
      });
    }
    return user;
  }
}
