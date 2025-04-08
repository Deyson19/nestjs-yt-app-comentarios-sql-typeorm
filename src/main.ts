import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('App Comentarios')
    .setDescription(
      'API - Backend app de comentarios en NESTJS y SQL Server - 2025',
    )
    .setVersion('1.0')
    .addTag('Comentario', 'Controlador - EndPoints de Comentarios')
    .addTag('Publicacion', 'Controlador - EndPoints de Publicaciones')
    .build();
  app.enableCors();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('swagger/index.html', app, documentFactory, {
    explorer: true,
    jsonDocumentUrl: 'swagger/json',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);

  console.log(`Server ${3000}:, ${await app.getUrl()}`);
  //   await Config.runScript();
}
bootstrap();
