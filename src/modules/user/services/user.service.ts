import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { handlePrismaError, hashPassword } from 'src/utils';
import { User } from '@prisma/client';
import { IGoogleUser } from 'src/models';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Create a new user in the database
  async createUser({
    email,
    firstname,
    lastname,
    username,
    password = undefined,
    provider = 'local',
    googleId = undefined,
  }: {
    email: string;
    firstname?: string;
    lastname?: string;
    username: string;
    password?: string;
    provider?: string;
    googleId?: string;
  }) {
    try {
      let hashedPassword: string | undefined;
      if (provider !== 'google' && password) {
        hashedPassword = await hashPassword(password);
      }
      return await this.prisma.user.create({
        data: {
          email,
          firstname,
          lastname,
          username,
          password: hashedPassword,
          provider,
          googleId,
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
  async getUserByGoogleId(googleId: string) {
    return this.prisma.user.findUnique({
      where: { googleId },
    });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findOrCreateGoogleUser(googleUser: IGoogleUser) {
    console.log('Google user:', googleUser);
    let user: User | null = await this.getUserByGoogleId(googleUser.googleId);

    if (!user) {
      user = await this.createUser({
        email: googleUser.email,
        firstname: googleUser.firstName,
        lastname: googleUser.lastName,
        username: googleUser.email.split('@')[0],
        provider: 'google',
        googleId: googleUser.googleId,
      });
    }
    if (user.provider !== 'google') {
      throw new UnauthorizedException(`Please log in using ${user.provider}`);
    }
    return user;
  }
}
