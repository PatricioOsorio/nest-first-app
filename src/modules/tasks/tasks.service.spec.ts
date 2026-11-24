import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AuditSinkService } from '@/core/audit/audit-sink.service';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { UsersService } from '../users/users.service';
import type { ITaskEntity } from './entities/task.entity';
import {
  ICreateTaskData,
  ITaskRepository,
  TOKEN_TASKS_REPOSITORY,
} from './repositories/tasks-repository.interface';
import { TaskService } from './tasks.service';

describe('TasksService', () => {
  let service: TaskService;

  const notifyMock = jest.fn();
  const auditSinkMock = jest.fn();
  const findByIdMock = jest.fn<Promise<ITaskEntity | null>, [string]>();
  const createMock = jest.fn<Promise<ITaskEntity>, [ICreateTaskData]>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const repoMock: Partial<ITaskRepository> = {
      create: createMock,
      findById: findByIdMock,
    };

    const module = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: TOKEN_TASKS_REPOSITORY, useValue: repoMock },
        { provide: UsersService, useValue: { findOne: jest.fn() } },
        { provide: NotificationsService, useValue: { notify: notifyMock } },
        { provide: AuditSinkService, useValue: { record: auditSinkMock } },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should throw NotFoundException when task is not found', async () => {
    findByIdMock.mockResolvedValueOnce(null);

    const task = service.findOne('missing-id');

    await expect(task).rejects.toThrow(NotFoundException);
  });

  it('should normalize optional fields and notify and create', async () => {
    createMock.mockImplementationOnce((task) =>
      Promise.resolve({
        ...task,
        id: 'task-1',
        completed: false,
      }),
    );

    const result = await service.create({
      userId: 'user-1',
      title: 'Test Task',
    });

    expect(result.description).toBe('');
    expect(notifyMock).toHaveBeenCalledTimes(1);
    expect(auditSinkMock).toHaveBeenCalledTimes(1);
  });
});
