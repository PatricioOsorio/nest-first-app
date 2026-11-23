import { AuditSinkService } from '@/core/audit/audit-sink.service';
import { PrismaService } from '@/core/database/prisma.service';
import { NotificationsService } from '@/core/notifications/notifications.service';
import type { Task as PrismaTask } from '@/generated/prisma/client';
import { UsersService } from '@/users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, PatchTaskDto, UpdateTaskDto } from './dto';
import { ITaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
    private readonly auditSink: AuditSinkService,
    private readonly prismaService: PrismaService,
  ) {}

  private toEntity(prismaTask: PrismaTask): ITaskEntity {
    return {
      id: prismaTask.id,
      title: prismaTask.title,
      description: prismaTask.description,
      completed: prismaTask.completed,
      userId: prismaTask.userId,
    };
  }

  private toEntities(prismaTasks: PrismaTask[]): ITaskEntity[] {
    return prismaTasks.map((task) => this.toEntity(task));
  }

  async findAll(): Promise<ITaskEntity[]> {
    const tasks = await this.prismaService.task.findMany();

    return this.toEntities(tasks);
  }

  async findOne(id: string): Promise<ITaskEntity> {
    const task = await this.prismaService.task.findUnique({
      where: { id },
    });

    if (!task) throw new NotFoundException('ups, task not found');

    return this.toEntity(task);
  }

  async create(dto: CreateTaskDto): Promise<ITaskEntity> {
    await this.usersService.findOne(dto.userId);
    const taskCreated = await this.prismaService.task.create({
      data: {
        title: dto.title,
        description: dto.description ?? '',
        userId: dto.userId,
      },
    });

    const taskCreatedEntity = this.toEntity(taskCreated);

    this.notificationsService.notify('task created', {
      ...taskCreatedEntity,
    });

    this.auditSink.record({
      action: 'TASK_CREATED',
      taskId: taskCreatedEntity.id,
      actorId: taskCreatedEntity.userId,
    });

    return taskCreatedEntity;
  }

  async replace(id: string, dto: UpdateTaskDto): Promise<ITaskEntity> {
    // verify that the task exists and user exists
    await this.findOne(id);
    await this.usersService.findOne(dto.userId);

    const taskUpdated = await this.prismaService.task.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description ?? '',
        completed: dto.completed,
        userId: dto.userId,
      },
    });

    return this.toEntity(taskUpdated);
  }

  async patch(id: string, dto: PatchTaskDto): Promise<ITaskEntity> {
    await this.findOne(id);
    await this.usersService.findOne(dto.userId);

    const taskUpdated = await this.prismaService.task.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description ?? '',
        completed: dto.completed,
        userId: dto.userId,
      },
    });

    return this.toEntity(taskUpdated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prismaService.task.delete({
      where: { id },
    });
  }
}
