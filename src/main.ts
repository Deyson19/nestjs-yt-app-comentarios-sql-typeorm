import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);

  console.log(`Server ${3000}:, ${await app.getUrl()}`);
  //   await Config.runScript();
}
bootstrap();
