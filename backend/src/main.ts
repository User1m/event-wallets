import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { isProd } from './utils';
import { graphqlUploadExpress } from 'graphql-upload-ts';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: isProd ? true : false,
      forbidUnknownValues: false,
    })
  );
  // app.enableCors();
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch(console.error);

if (isProd) {
  global.console.log = () => {};
  global.console.warn = () => {};
  global.console.error = () => {};
}
