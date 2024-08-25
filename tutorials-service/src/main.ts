import { NestFactory } from '@nestjs/core';
import { TutorialsModule } from './tutorials/tutorials.module';
import { Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

config();
async function bootstrap() {
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_PORT:', process.env.DB_PORT);
  console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
  console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
  console.log('POSTGRES_DB:', process.env.POSTGRES_DB);
  console.log('SENHA_JWT:', process.env.SENHA_JWT);
  console.log('EXPIRE_TOKEN:', process.env.EXPIRE_TOKEN);
  const app = await NestFactory.createMicroservice(TutorialsModule, {
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });

  app.listen();
}

bootstrap();
