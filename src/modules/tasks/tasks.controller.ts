import { TrimPipe } from '@/common/pipes/trim.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto, PatchTaskDto, UpdateTaskDto } from './dto';
import { TaskService, type ITask } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAll(): ITask[] {
    return this.taskService.findAll();
  }

  @Get(':id')
  get(@Param('id', TrimPipe, ParseUUIDPipe) id: string): ITask {
    return this.taskService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateTaskDto): ITask {
    return this.taskService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', TrimPipe, ParseUUIDPipe) id: string,
    @Body() body: UpdateTaskDto,
  ): ITask {
    return this.taskService.replace(id, body);
  }

  @Patch(':id')
  patch(
    @Param('id', TrimPipe, ParseUUIDPipe) id: string,
    @Body() body: PatchTaskDto,
  ): ITask {
    return this.taskService.patch(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', TrimPipe, ParseUUIDPipe) id: string): void {
    return this.taskService.remove(id);
  }
}
