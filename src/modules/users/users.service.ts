import { EUserRole } from '@/common/enums/user-role.enum';
import { PrismaService } from '@/core/database/prisma.service';
import type { User as PrismaUser, UserRole as PrismaUserRole } from '@/generated/prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { type IUserEntity } from './entities/user.entity';

const USER_ROLE_MAP: Record<PrismaUserRole, EUserRole> = {
  ADMIN: EUserRole.ADMIN,
  USER: EUserRole.USER,
  VIEWER: EUserRole.VIEWER,
};

@Injectable()
export class UsersService {
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

  async findOne(id: string): Promise<IUserEntity> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('ups, user not found');

    return this.toEntity(user);
  }
}
