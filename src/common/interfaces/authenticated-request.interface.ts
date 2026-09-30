import type { Request } from 'express';
import { IRequestUser } from './request-user.interface';

export interface IAuthenticatedRequest extends Request {
  user?: IRequestUser;
}
