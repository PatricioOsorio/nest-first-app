import { EUserRole } from '@/common/enums/user-role.enum';
import { PrismaService } from '@/core/database/prisma.service';
import type { User as PrismaUser, UserRole as PrismaUserRole } from '@/generated/prisma/client';
import { Injectable } from '@nestjs/common';
import { IUserEntity } from '../entities/user.entity';
import type { IUsersRepository } from './users-repository.interface';

const USER_ROLE_MAP: Record<PrismaUserRole, EUserRole> = {
  ADMIN: EUserRole.ADMIN,
  USER: EUserRole.USER,
  VIEWER: EUserRole.VIEWER,
};

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private toEntity(user: PrismaUser): IUserEntity {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: USER_ROLE_MAP[user.role],
    };
  }

  private toEntities(users: PrismaUser[]): IUserEntity[] {
    return users.map((user) => this.toEntity(user));
  }

  async findAll(): Promise<IUserEntity[]> {
    const users = await this.prismaService.user.findMany();
    return this.toEntities(users);
  }

  async findById(id: string): Promise<IUserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return this.toEntity(user);
  }
}
