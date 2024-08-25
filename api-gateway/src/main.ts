import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway/gateway.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(3004);
}

bootstrap();
