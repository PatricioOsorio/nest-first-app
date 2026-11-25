import { PrismaService } from '@/core/database/prisma.service';
import type { Prisma, ActivityLog as PrismaActivityLog } from '@/generated/prisma/client';
import { Inject, Injectable } from '@nestjs/common';
import type { IActivityLogEntity } from '../entities/activity-log.entity';
import type {
  IActivityLogsRepository,
  ICreateActivityLogData,
} from './activity-logs-repository.interface';

@Injectable()
export class PrismaActivityLogsRepository implements IActivityLogsRepository {
  constructor(@Inject(PrismaService) private readonly db: Prisma.TransactionClient) {}

  private toEntity(row: PrismaActivityLog): IActivityLogEntity {
    return {
      id: row.id,
      action: row.action,
      taskId: row.taskId,
      actorId: row.actorId,
      details: row.details,
      createdAt: row.createdAt,
    };
  }

  private toEntities(rows: PrismaActivityLog[]): IActivityLogEntity[] {
    return rows.map((r) => this.toEntity(r));
  }

  async create(data: ICreateActivityLogData): Promise<IActivityLogEntity> {
    const log: PrismaActivityLog = await this.db.activityLog.create({
      data: {
        action: data.action,
        taskId: data.taskId,
        actorId: data.actorId,
        details: data.details,
      },
    });

    return this.toEntity(log);
  }

  async findByTaskId(taskId: string): Promise<IActivityLogEntity[]> {
    const logs = await this.db.activityLog.findMany({
      where: { taskId },
      orderBy: { createdAt: 'asc' },
    });

    return this.toEntities(logs);
  }
}
