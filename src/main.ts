import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwagger } from './config/swagger.config';
import 'dotenv/config';
import { CatchEverythingFilter } from './helpers/logger-exce-filter';
import { LoggingService } from './helpers/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: new LoggingService(),
  });

  app.useGlobalPipes(new ValidationPipe());

  const httpAdapter = app.get(HttpAdapterHost);
  const loggingService = app.get(LoggingService);

  process.on('uncaughtException', (err) => {
    loggingService.error(
      `Uncaught  Exception: ${err.name}, Message ${err.message}`,
    );
    loggingService.error(
      `Server end with error. Time: ${new Date().toLocaleString()}`,
    );

    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error(`Unhandled Rejection: Reason: ${reason}`);
    loggingService.error(
      `Server end with error. Time: ${new Date().toLocaleString()}`,
    );

    process.exit(1);
  });

  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter, loggingService));

  SwaggerModule.setup('doc', app, await getSwagger());

  await app.listen(process.env.PORT || 4000, () => {
    loggingService.log(`Server start. Time: ${new Date().toLocaleString()}`);
  });
}

bootstrap();
