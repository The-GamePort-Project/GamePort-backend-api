import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService, PrismaService } from './services';
import {
  UserModule,
  PrismaModule,
  AuthModule,
  GameModule,
  ReviewModule,
} from './modules';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? ['.env', '.env.local', '.env.development', '.env.production']
          : undefined,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }: { req: Request }) => ({ req }),
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    GameModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
