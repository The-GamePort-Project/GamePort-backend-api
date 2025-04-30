import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
//abort on error maybe?
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isDevelopment = process.env.NODE_ENV === 'development';

  app.use(cookieParser());
  const configService = app.get(ConfigService);

  const allowedOrigin = isDevelopment
    ? configService.get<string>('ALLOWED_ORIGIN_DEV')
    : (configService.get<string>('ALLOWED_ORIGIN') ?? 'http://localhost:3000');

  app.enableCors({
    origin: allowedOrigin,
    credentials: true,
  });
  console.log(
    'Connecting to DB:',
    process.env.DATABASE_URL?.slice(0, 30) + '...',
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${process.env.PORT ?? 3000}`);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
