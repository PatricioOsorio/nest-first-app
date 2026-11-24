import { IUserEntity } from '../entities/user.entity';

export const TOKEN_USERS_REPOSITORY = Symbol('TOKEN_USERS_REPOSITORY');

export interface IUsersRepository {
  findAll(): Promise<IUserEntity[]>;
  findById(id: string): Promise<IUserEntity | null>;
}
