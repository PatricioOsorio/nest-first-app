import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from '@/core/env.schema';
import { HealthModule } from '@/core/health/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  providers: [AppService],
})
export class AppModule {}
