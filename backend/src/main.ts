import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import mongoose from 'mongoose';
mongoose.set('debug', true);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  await app.listen(process.env.PORT);
}
bootstrap();
