import { EUserRole } from '@/common/enums/user-role.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { type IUserEntity } from './entities/user.entity';

const SEED: IUserEntity[] = [
  {
    id: 'fcea2b64-2dba-47d1-ac32-cdc13541efeb',
    name: 'name 1',
    email: 'email1',
    role: EUserRole.USER,
  },
];

@Injectable()
export class UsersService {
  private readonly users: IUserEntity[] = SEED;

  findAll(): IUserEntity[] {
    return this.users;
  }

  findOne(id: string): IUserEntity {
    const user = this.users.find((u) => u.id === id);

    if (!user) throw new NotFoundException('ups, user not found');

    return user;
  }
}
