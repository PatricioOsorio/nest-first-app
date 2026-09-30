import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { RequestLoggerMiddleware } from '@/common/middleware/request-logger.middleware';
import { envSchema } from '@/core/env.schema';
import { HealthModule } from '@/core/health/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => envSchema.parse(config),
      isGlobal: true,
    }),
    HealthModule,
    TasksModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes({ path: '(.*)', method: RequestMethod.ALL });
  }
}
