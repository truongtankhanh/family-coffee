/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppDataSource, databaseOptions} from '@family-coffee/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = process.env.GLOBAL_PREFIX;
  app.setGlobalPrefix(globalPrefix);

  const options = new DocumentBuilder()
    .setTitle('API for cafe management')
    .setVersion('1.0')
    .setBasePath(globalPrefix)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('manager/api-docs', app, document);

  // START: connect database
  // AppDataSource.setOptions(databaseOptions(process.env));
  // AppDataSource.driver.options = AppDataSource.options;

  // if (AppDataSource.isInitialized) {
  //   Logger.debug('Reusing existing connection.');
  // } else {
  //   await AppDataSource.initialize();
  //   Logger.debug('Data Source has been initialized!');
  // }
  // END: connect database

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Docs API is running on: http://localhost:${port}/manager/api-docs`
  );
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
