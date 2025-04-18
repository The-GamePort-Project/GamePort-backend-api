import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//abort on error maybe?
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(true);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${process.env.PORT ?? 3000}`);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
