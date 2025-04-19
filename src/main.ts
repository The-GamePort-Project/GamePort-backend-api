import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
//abort on error maybe?
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  console.log('JWT Secret:', configService.get<string>('JWT_SECRET'));
  console.log(
    'Access Token Expiration:',
    configService.get<string>('JWT_ACCESS_EXPIRATION'),
  );
  console.log(
    'Refresh Token Expiration:',
    configService.get<string>('JWT_REFRESH_EXPIRATION'),
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${process.env.PORT ?? 3000}`);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
