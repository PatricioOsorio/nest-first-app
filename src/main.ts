import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IEnvSchema } from '@/core/env.schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService<IEnvSchema, true>>(ConfigService);

  app.setGlobalPrefix('api/v1');

  const port = configService.getOrThrow('PORT', { infer: true });
  await app.listen(port);
}

void bootstrap();
