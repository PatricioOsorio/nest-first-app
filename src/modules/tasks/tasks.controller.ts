import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto, PatchTaskDto, UpdateTaskDto } from './dto';

interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

@Controller('tasks')
export class TasksController {
  private readonly tasks: ITask[] = [
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

  @Get()
  getAll(): ITask[] {
    return this.tasks;
  }

  @Get(':id')
  get(@Param('id') id: string): ITask {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) throw new NotFoundException('Ups, task not found!');

    return task;
  }

  @Post()
  create(@Body() body: CreateTaskDto): ITask {
    const newTask: ITask = {
      id: crypto.randomUUID(),
      title: body.title,
      description: body.description,
      completed: false,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateTaskDto): ITask {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) throw new NotFoundException('Ups, task not found!');

    task.title = body.title;
    task.description = body.description;
    task.completed = body.completed;

    return task;
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() body: PatchTaskDto): ITask {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) throw new NotFoundException('Ups, task not found!');

    task.title = body.title ?? task.title;
    task.description = body.description ?? task.description;
    task.completed = body.completed ?? task.completed;

    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): void {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) throw new NotFoundException('Ups, task not found!');

    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
}
