import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//abort on error maybe?
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${process.env.PORT ?? 3000}`);
  console.log(
    'ddb:',
    process.env.DATABASE_URL,
    typeof process.env.DATABASE_URL,
  );
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
