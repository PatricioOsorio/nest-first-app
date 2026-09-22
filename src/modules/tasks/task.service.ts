import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTaskDto,
  PatchTaskDto,
  UpdateTaskDto,
} from 'src/modules/tasks/dto';

export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const SEED: ITask[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description for Task 1',
    completed: false,
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Description for Task 2',
    completed: true,
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Description for Task 3',
    completed: false,
  },
];

@Injectable()
export class TaskService {
  private readonly tasks: ITask[] = SEED;

  findAll(): ITask[] {
    return this.tasks;
  }

  findOne(id: string): ITask {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) throw new NotFoundException('ups, task not found');

    return task;
  }

  create(dto: CreateTaskDto): ITask {
    const newTask: ITask = {
      id: crypto.randomUUID(),
      title: dto.title,
      description: dto.description,
      completed: false,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  replace(id: string, dto: UpdateTaskDto): ITask {
    const task = this.findOne(id);

    task.title = dto.title;
    task.description = dto.description;
    task.completed = dto.completed;

    return task;
  }

  patch(id: string, dto: PatchTaskDto): ITask {
    const task = this.findOne(id);

    task.title = dto.title ?? task.title;
    task.description = dto.description ?? task.description;
    task.completed = dto.completed ?? task.completed;

    return task;
  }

  remove(id: string): void {
    const task = this.findOne(id);

    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
}
