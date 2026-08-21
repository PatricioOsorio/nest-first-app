import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_NAME } from './core/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

console.log(APP_NAME);
