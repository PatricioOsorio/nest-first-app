import { EUserRole } from '@/common/enums/user-role.enum';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<EUserRole[]>();
