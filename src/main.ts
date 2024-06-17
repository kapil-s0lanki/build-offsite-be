import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import appConfig from './config/app.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const configService = new ConfigService({ app: appConfig() });
  const app = await NestFactory.create(AppModule);

  const port = configService.get<number>('app.port');
  // const host = configService.get<string>('app.devicehost');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors();
  app.enableShutdownHooks();
  const config = new DocumentBuilder()
    .setTitle('EventCRM Backend')
    .setDescription('The EventCRM API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('eventCrm')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
