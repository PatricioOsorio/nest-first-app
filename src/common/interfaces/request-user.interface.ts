import { IUserEntity } from '@/modules/users/entities/user.entity';

export type IRequestUser = Pick<IUserEntity, 'id' | 'email' | 'role'>;
