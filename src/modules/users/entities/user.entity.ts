import { EUserRole } from '@/common/enums/user-role.enum';

export interface IUserEntity {
  id: string;
  name: string;
  email: string;
  role: EUserRole;
}
