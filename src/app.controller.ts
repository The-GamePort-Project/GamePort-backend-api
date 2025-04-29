import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './services';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
    // Create a new admin user
    this.prisma.user
      .create({
        data: {
          email: 'test123@mail.com',
          firstname: 'Test',
          lastname: 'Test',
          username: 'Test',
          password: 'Test123',
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
    await this.prisma.user.delete({
      where: {
        email: 'test123@mail.com',
      },
    });
    return 'Admin user deleted';
  }
}
