import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway/gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Usuario e Tutorial')
    .setDescription(
      'Documentação para o código com rotas de Usuario e Tutorial',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3004);
}

bootstrap();
