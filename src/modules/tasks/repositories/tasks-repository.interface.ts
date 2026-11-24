import type { ITaskEntity } from '../entities/task.entity';

export const TOKEN_TASKS_REPOSITORY = Symbol('TOKEN_TASKS_REPOSITORY');

export type ICreateTaskData = Omit<ITaskEntity, 'id' | 'completed'>;
export type IReplaceTaskData = Omit<ITaskEntity, 'id'>;
export type IPatchTaskData = Partial<IReplaceTaskData>;

export interface ITaskRepository {
  findAll(): Promise<ITaskEntity[]>;
  findById(id: string): Promise<ITaskEntity | null>;
  create(data: ICreateTaskData): Promise<ITaskEntity>;
  replace(id: string, data: IReplaceTaskData): Promise<ITaskEntity>;
  patch(id: string, data: IPatchTaskData): Promise<ITaskEntity>;
  delete(id: string): Promise<void>;
}
