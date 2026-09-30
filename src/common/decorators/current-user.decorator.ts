import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthenticatedRequest } from '../interfaces/authenticated-request.interface';
import { IRequestUser } from '../interfaces/request-user.interface';

export const CurrentUser = createParamDecorator(
  (
    data: keyof IRequestUser | undefined,
    ctx: ExecutionContext,
  ): IRequestUser | IRequestUser[keyof IRequestUser] | undefined => {
    const req = ctx.switchToHttp().getRequest<IAuthenticatedRequest>();
    const user = req.user;

    return data ? user?.[data] : user;
  },
);
