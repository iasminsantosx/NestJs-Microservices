import { NestFactory } from '@nestjs/core';
import { TutorialsModule } from './tutorials/tutorials.module';
import { Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

config();
async function bootstrap() {

  const app = await NestFactory.create(TutorialsModule);
  await app.listen(3001);
}

bootstrap();
