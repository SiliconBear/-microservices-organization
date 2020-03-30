import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const SERVICE_PORT = 8091;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: SERVICE_PORT,
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(SERVICE_PORT, () => Logger.log(`:::== [Organization Hybrid Microservice] App Started :::=-> ${SERVICE_PORT}`));
}
bootstrap();
