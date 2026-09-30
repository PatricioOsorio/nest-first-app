import { UsersService } from '@/users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, PatchTaskDto, UpdateTaskDto } from './dto';
import { ITaskEntity } from './entities/task.entity';

const SEED: ITaskEntity[] = [
  {
    id: 'dc15f411-3770-420c-9d4e-1f670524ae48',
    title: 'Task 1',
    description: 'Description for Task 1',
    completed: false,
    userId: 'TEST1',
  },
  {
    id: '9a29c615-64ef-4fbd-af4d-a93ec57cf0f2',
    title: 'Task 2',
    description: 'Description for Task 2',
    completed: true,
    userId: 'TEST2',
  },
  {
    id: '0036078f-6214-4657-bef5-77ffccdb0cb7',
    title: 'Task 3',
    description: 'Description for Task 3',
    completed: false,
    userId: 'TEST3',
  },
];

@Injectable()
export class TaskService {
  private readonly tasks: ITaskEntity[] = SEED;

  constructor(private readonly usersService: UsersService) {}

  findAll(): ITaskEntity[] {
    return this.tasks;
  }

  findOne(id: string): ITaskEntity {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) throw new NotFoundException('ups, task not found');

    return task;
  }

  create(dto: CreateTaskDto): ITaskEntity {
    const userAssigned = this.usersService.findOne(dto.userId);

    const newTask: ITaskEntity = {
      id: crypto.randomUUID(),
      title: dto.title,
      description: dto.description,
      completed: false,
      userId: userAssigned.id,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  replace(id: string, dto: UpdateTaskDto): ITaskEntity {
    const task = this.findOne(id);

    task.title = dto.title;
    task.description = dto.description;
    task.completed = dto.completed;
    task.userId = dto.userId;

    return task;
  }

  patch(id: string, dto: PatchTaskDto): ITaskEntity {
    const task = this.findOne(id);

    task.title = dto.title ?? task.title;
    task.description = dto.description ?? task.description;
    task.completed = dto.completed ?? task.completed;
    task.userId = dto.userId ?? task.userId;

    return task;
  }

  remove(id: string): void {
    const task = this.findOne(id);

    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
}
