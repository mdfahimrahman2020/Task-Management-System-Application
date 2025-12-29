import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable global validation using class-validator decorators in DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not defined in the DTO
    }),
  );

  // Serve static files from /uploads for accessing attachments
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // e.g., http://localhost:3000/uploads/filename.jpg
  });

  // Start server on port (from .env or default 3000)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
