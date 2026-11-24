import { AuditModule } from '@/core/audit/audit.module';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { PrismaTasksRepository } from './repositories/prisma-tasks.repository';
import { TOKEN_TASKS_REPOSITORY } from './repositories/tasks-repository.interface';
import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [
    TaskService,
    {
      provide: TOKEN_TASKS_REPOSITORY,
      useClass: PrismaTasksRepository,
    },
  ],
  imports: [UsersModule, AuditModule],
})
export class TasksModule {}
