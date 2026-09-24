import { Injectable, NotFoundException } from '@nestjs/common';

export interface IUser {
  id: string;
  name: string;
  email: string;
}

const SEED: IUser[] = [
  {
    id: 'fcea2b64-2dba-47d1-ac32-cdc13541efeb',
    name: 'name 1',
    email: 'email1',
  },
];

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
