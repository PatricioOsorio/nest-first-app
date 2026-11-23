import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

export class PatchTaskDto extends IntersectionType(
  PartialType(UpdateTaskDto),
  PickType(CreateTaskDto, ['userId']),
) {}
