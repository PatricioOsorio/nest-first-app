import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title!: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  userId!: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority: TaskPriority = TaskPriority.LOW;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[] = [];
}
