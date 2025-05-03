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
      const newUser = await this.prisma.user.create({
        data: {
          email,
          firstname,
          lastname,
          username,
          password: hashedPassword,
          provider,
          googleId,
        },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          username: true,
          provider: true,
          googleId: true,
          createdAt: true,
          updatedAt: true,
          role: true,
        },
      });
      return newUser;
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

  async getUsersPaginated({
    pagination: { skip = 0, take = 10 } = { skip: 0, take: 10 },
  }: {
    pagination?: { skip?: number; take?: number };
  }) {
    return this.prisma.user.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        username: true,
        provider: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });
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
    const user = await this.getUserByGoogleId(googleUser.googleId);

    if (!user) {
      const newUser = await this.createUser({
        email: googleUser.email,
        username: googleUser.email.split('@')[0],
        provider: 'google',
        googleId: googleUser.googleId,
        firstname: googleUser.firstName || googleUser.name.split(' ')[0],
        lastname: googleUser.lastName || googleUser.name.split(' ')[1] || '',
      });
      return newUser;
    }

    if (!user?.provider || user.provider !== 'google') {
      throw new UnauthorizedException(`Please log in using Google`);
    }

    return user;
  }
}
