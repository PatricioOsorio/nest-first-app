import { Injectable, NotFoundException } from '@nestjs/common';

export interface IUser {
  id: string;
  name: string;
  email: string;
}

const SEED: IUser[] = [{ name: 'name 1', email: 'email1', id: 'TEST1' }];

@Injectable()
export class UsersService {
  private readonly users: IUser[] = SEED;

  findAll(): IUser[] {
    return this.users;
  }

  findOne(id: string): IUser {
    const user = this.users.find((u) => u.id === id);

    if (!user) throw new NotFoundException('ups, user not found');

    return user;
  }
}
