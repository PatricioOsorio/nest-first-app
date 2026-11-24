import { AuditSinkService } from '@/core/audit/audit-sink.service';
import { NotificationsService } from '@/core/notifications/notifications.service';
import { UsersService } from '@/users/users.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, PatchTaskDto, UpdateTaskDto } from './dto';
import { ITaskEntity } from './entities/task.entity';
import {
  type ITaskRepository,
  TOKEN_TASKS_REPOSITORY,
} from './repositories/tasks-repository.interface';

@Injectable()
export class TaskService {
  constructor(
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
    private readonly auditSink: AuditSinkService,
    @Inject(TOKEN_TASKS_REPOSITORY) private readonly taskRepository: ITaskRepository,
  ) {}

  async findAll(): Promise<ITaskEntity[]> {
    return await this.taskRepository.findAll();
  }

  async findOne(id: string): Promise<ITaskEntity> {
    const task = await this.taskRepository.findById(id);

    if (!task) throw new NotFoundException('ups, task not found');

    return task;
  }

  async create(dto: CreateTaskDto): Promise<ITaskEntity> {
    await this.usersService.findOne(dto.userId);

    const newTask = await this.taskRepository.create({
      title: dto.title,
      description: dto.description ?? '',
      userId: dto.userId,
    });

    this.notificationsService.notify('task created', {
      ...newTask,
    });

    this.auditSink.record({
      action: 'TASK_CREATED',
      taskId: newTask.id,
      actorId: newTask.userId,
    });

    return newTask;
  }

  async replace(id: string, dto: UpdateTaskDto): Promise<ITaskEntity> {
    // verify task and user exists
    await this.findOne(id);
    await this.usersService.findOne(dto.userId);

    const newTask = await this.taskRepository.replace(id, {
      title: dto.title,
      description: dto.description ?? '',
      completed: dto.completed,
      userId: dto.userId,
    });

    return newTask;
  }

  async patch(id: string, dto: PatchTaskDto): Promise<ITaskEntity> {
    await this.findOne(id);
    await this.usersService.findOne(dto.userId);

    const newTask = await this.taskRepository.patch(id, {
      title: dto.title,
      completed: dto.completed,
      description: dto.description,
      userId: dto.userId,
    });

    return newTask;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    return await this.taskRepository.delete(id);
  }
}
