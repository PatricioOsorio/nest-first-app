import { PrismaClient } from '@/generated/prisma/client';
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import type { IEnvSchema } from '../env.schema';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService<IEnvSchema, true>) {
    const adapter = new PrismaBetterSqlite3({
      url: configService.getOrThrow('DATABASE_URL', { infer: true }),
    });

    super({ adapter });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log(`Connected to the database`);
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log(`Disconnected from the database`);
  }
}
