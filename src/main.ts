import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwagger } from './config/swagger.config';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('doc', app, await getSwagger());

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
