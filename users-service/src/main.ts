import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

config();
async function bootstrap() {
  const app = await NestFactory.createMicroservice(UsersModule, {
    transport: Transport.TCP,
    options: {
      port: 3000,
    },
  });

  app.listen();
}

bootstrap();