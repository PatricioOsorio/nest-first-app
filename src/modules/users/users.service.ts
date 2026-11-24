import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type IUserEntity } from './entities/user.entity';
import {
  type IUsersRepository,
  TOKEN_USERS_REPOSITORY,
} from './repositories/users-repository.interface';

@Injectable()
export class UsersService {
  constructor(@Inject(TOKEN_USERS_REPOSITORY) private readonly usersRepository: IUsersRepository) {}

  async findAll(): Promise<IUserEntity[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<IUserEntity> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException('ups, user not found');

    return user;
  }
}
