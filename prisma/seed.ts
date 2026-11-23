import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import 'dotenv/config';

import { EUserRole } from '../src/common/enums/user-role.enum';
import { PrismaClient } from '../src/generated/prisma/client';
import { ITaskEntity } from '../src/modules/tasks/entities/task.entity';
import { IUserEntity } from '../src/modules/users/entities/user.entity';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is required to run the seed script');

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

const USER: IUserEntity = {
  id: 'fcea2b64-2dba-47d1-ac32-cdc13541efeb',
  name: 'Dev User',
  email: 'dev@sandbox.com',
  role: EUserRole.USER,
};

const TASKS: ITaskEntity[] = [
  {
    id: 'a7e57cdc-eafd-4059-8aaf-104d122f0e03',
    title: 'Task 1',
    description: 'Description for Task 1',
    completed: false,
    userId: USER.id,
  },
  {
    id: '71d93b1d-2e2a-4612-9943-5f63dc72f0cf',
    title: 'Task 2',
    description: 'Description for Task 2',
    completed: true,
    userId: USER.id,
  },
  {
    id: 'aa355dcd-f3d5-402d-8514-e952da769582',
    title: 'Task 3',
    description: 'Description for Task 3',
    completed: false,
    userId: USER.id,
  },
];

async function seed(): Promise<void> {
  await prisma.user.upsert({
    where: { id: USER.id },
    update: {},
    create: USER,
  });
  console.log('Seeded user');

  for (const task of TASKS) {
    await prisma.task.upsert({
      where: { id: task.id },
      update: {},
      create: task,
    });
  }
  console.log('Seeded tasks');

  console.log('Seeding completed successfully');
}

void seed()
  .catch((error: unknown) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
