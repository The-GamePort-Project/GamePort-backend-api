import { PrismaService } from 'src/services';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
@Injectable()
export class GameService {
  constructor(private prismaService: PrismaService) {}

  getGamesPaginated() {}
}
