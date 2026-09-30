import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { Observable } from 'rxjs';
import { EUserRole } from '../enums/user-role.enum';

interface IUser {
  role: EUserRole;
}

export interface IAuthenticatedRequest extends Request {
  user?: IUser;
}

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<IAuthenticatedRequest>();
    const apiKey = request.headers['x-api-key'];

    const validApiKey = this.configService.get<string>('API_KEY');

    if (!apiKey || apiKey !== validApiKey) throw new UnauthorizedException('Invalid API key');

    const role = (request.headers['x-user-role'] as EUserRole) || EUserRole.VIEWER;

    request.user = { role };

    return true;
  }
}
