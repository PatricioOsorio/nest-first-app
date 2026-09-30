import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { EUserRole } from '../enums/user-role.enum';
import { IAuthenticatedRequest } from '../interfaces/authenticated-request.interface';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<IAuthenticatedRequest>();
    const apiKey = request.headers['x-api-key'];

    const validApiKey = this.configService.get<string>('API_KEY');

    if (!apiKey || apiKey !== validApiKey) throw new UnauthorizedException('Invalid API key');

    const role = (request.headers['x-user-role'] as EUserRole) || EUserRole.VIEWER;
    const id = (request.headers['x-user-id'] as string) ?? 'fcea2b64-2dba-47d1-ac32-cdc13541efeb';
    const email = (request.headers['x-user-email'] as string) ?? 'dev@sandbox.com';

    request.user = { role, id, email };

    return true;
  }
}
