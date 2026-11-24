import { type DynamicModule, Module } from '@nestjs/common';
import {
  INotificationsModuleAsyncOptions,
  INotificationsModuleOptions,
  TOKEN_NOTIFICATIONS_OPTIONS,
} from './notifications.interface';
import { NotificationsService } from './notifications.service';

@Module({})
export class NotificationsModule {
  private static sharedConfig(
    options: INotificationsModuleOptions | INotificationsModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: NotificationsModule,
      global: options.isGlobal ?? false,
      exports: [NotificationsService],
    };
  }

  static forRoot(options: INotificationsModuleOptions): DynamicModule {
    return {
      ...this.sharedConfig(options),
      providers: [
        {
          provide: TOKEN_NOTIFICATIONS_OPTIONS,
          useValue: options,
        },
        NotificationsService,
      ],
    };
  }

  static forRootAsync(options: INotificationsModuleAsyncOptions): DynamicModule {
    return {
      ...this.sharedConfig(options),
      imports: options.imports ?? [],
      providers: [
        {
          provide: TOKEN_NOTIFICATIONS_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },
        NotificationsService,
      ],
    };
  }
}
