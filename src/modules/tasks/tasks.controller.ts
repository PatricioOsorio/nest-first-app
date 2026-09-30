import { ClientIp } from '@/common/decorators/client-ip.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { EUserRole } from '@/common/enums/user-role.enum';
import { ApiKeyGuard } from '@/common/guards/api-key.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import type { IRequestUser } from '@/common/interfaces/request-user.interface';
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
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto, PatchTaskDto, UpdateTaskDto } from './dto';
import { type ITaskEntity } from './entities/task.entity';
import { TaskService } from './tasks.service';

export interface IProfileResponse {
  user: IRequestUser;
  role: EUserRole;
  clientIp: string;
}

@Controller('tasks')
@UseGuards(ApiKeyGuard, RolesGuard)
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get('simulation/unhandled-error')
  simulateUnhandledError(): void {
    throw new Error('Database disk failure or connection pool exhausted');
  }

  @Get('me')
  getProfile(
    @CurrentUser() user: IRequestUser,
    @CurrentUser('role') role: EUserRole,
    @ClientIp() ip: string,
  ): IProfileResponse {
    return {
      user,
      role,
      clientIp: ip,
    };
  }

  @Get()
  getAll(): ITaskEntity[] {
    return this.taskService.findAll();
  }

  @Get(':id')
  get(@Param('id', TrimPipe, ParseUUIDPipe) id: string): ITaskEntity {
    return this.taskService.findOne(id);
  }

  @Post()
  @Roles([EUserRole.ADMIN, EUserRole.USER])
  create(@Body() body: CreateTaskDto): ITaskEntity {
    return this.taskService.create(body);
  }

  @Put(':id')
  @Roles([EUserRole.ADMIN, EUserRole.USER])
  update(
    @Param('id', TrimPipe, ParseUUIDPipe) id: string,
    @Body() body: UpdateTaskDto,
  ): ITaskEntity {
    return this.taskService.replace(id, body);
  }

  @Patch(':id')
  @Roles([EUserRole.ADMIN, EUserRole.USER])
  patch(@Param('id', TrimPipe, ParseUUIDPipe) id: string, @Body() body: PatchTaskDto): ITaskEntity {
    return this.taskService.patch(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles([EUserRole.ADMIN])
  delete(@Param('id', TrimPipe, ParseUUIDPipe) id: string): void {
    return this.taskService.remove(id);
  }
}
