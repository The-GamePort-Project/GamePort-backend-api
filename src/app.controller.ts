import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { hashPassword } from './utils';
import { PrismaService } from './services';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return process.env.NODE_ENV as string;
  }
  @Post()
  postHello(): string {
    return '2';
  }
  @Get('create-admin')
  async createAdmin(): Promise<string> {
    const adminUser = await this.prisma.user.findUnique({
      where: {
        email: 'test123@mail.com',
      },
    });
    if (adminUser) {
      return 'Admin user already exists';
    }
    const hashedPassword = await hashPassword('Test123');
    // Create a new admin user
    this.prisma.user
      .create({
        data: {
          email: 'test123@mail.com',
          firstname: 'Test',
          lastname: 'Test',
          username: 'Test',
          password: hashedPassword,
          provider: 'local',
        },
      })
      .catch((error) => {
        return 'Error creating admin user: ' + error;
      });
    return 'Admin user created';
  }
  @Get('delete-admin')
  async deleteAdmin(): Promise<string> {
    try {
      await this.prisma.user.delete({
        where: {
          email: 'test123@mail.com',
        },
      });
      return 'Admin user deleted';
    } catch (error) {
      console.error('Delete error:', error);
      return 'Admin user not found or could not be deleted';
    }
  }
}
