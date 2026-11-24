import { Module } from '@nestjs/common';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';
import { TOKEN_USERS_REPOSITORY } from './repositories/users-repository.interface';
import { UsersService } from './users.service';

@Module({
  providers: [
    UsersService,
    {
      provide: TOKEN_USERS_REPOSITORY,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
