import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { config } from 'dotenv';

config();
async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  await app.listen(3000);
}

bootstrap();