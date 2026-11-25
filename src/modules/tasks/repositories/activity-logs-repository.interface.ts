import type { IActivityLogEntity } from '../entities/activity-log.entity';

export const TOKEN_ACTIVITY_LOGS_REPOSITORY = Symbol('TOKEN_ACTIVITY_LOGS_REPOSITORY');

export type ICreateActivityLogData = Omit<IActivityLogEntity, 'id' | 'createdAt'>;

export interface IActivityLogsRepository {
  create(data: ICreateActivityLogData): Promise<IActivityLogEntity>;
  findByTaskId(taskId: string): Promise<IActivityLogEntity[]>;
}
