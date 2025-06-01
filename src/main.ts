import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { swaggerDocument } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, swaggerDocument as OpenAPIObject);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
