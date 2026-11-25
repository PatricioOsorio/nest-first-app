import { PrismaService } from '@/core/database/prisma.service';
import type { Task as PrismaTask } from '@/generated/prisma/client';
import { Injectable } from '@nestjs/common';
import type { ITaskEntity } from '../entities/task.entity';
import type {
  ICreateTaskData,
  IPatchTaskData,
  IReplaceTaskData,
  ITaskRepository,
} from './tasks-repository.interface';

@Injectable()
export class PrismaTasksRepository implements ITaskRepository {
  constructor(private readonly prismaService: PrismaService) {}

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

  async findById(id: string): Promise<ITaskEntity | null> {
    const task = await this.prismaService.task.findUnique({
      where: { id },
    });

    if (!task) return null;

    return this.toEntity(task);
  }

  async create(data: ICreateTaskData): Promise<ITaskEntity> {
    const newTask: PrismaTask = await this.prismaService.task.create({
      data: {
        title: data.title,
        description: data.description,
        userId: data.userId,
      },
    });

    return this.toEntity(newTask);
  }

  async replace(id: string, data: IReplaceTaskData): Promise<ITaskEntity> {
    const newTask = await this.prismaService.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        completed: data.completed,
        userId: data.userId,
      },
    });

    return this.toEntity(newTask);
  }

  async patch(id: string, data: IPatchTaskData): Promise<ITaskEntity> {
    const newTask = await this.prismaService.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        completed: data.completed,
        userId: data.userId,
      },
    });

    return this.toEntity(newTask);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.task.delete({
      where: { id },
    });
  }
}
