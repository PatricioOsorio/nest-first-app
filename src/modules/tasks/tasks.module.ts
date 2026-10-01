import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TASK_NOTIFIER_TOKEN } from './interfaces/task-notifier.interface';
import { ConsoleTaskNotifierService } from './services/console-task-notifier.service';
import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [
    TaskService,
    {
      provide: TASK_NOTIFIER_TOKEN,
      useFactory(configService: ConfigService) {
        const appName = configService.get<string>('APP_NAME') || 'TaskTracker';
        return new ConsoleTaskNotifierService(appName);
      },
      inject: [ConfigService],
    },
  ],
  imports: [UsersModule],
})
export class TasksModule {}
