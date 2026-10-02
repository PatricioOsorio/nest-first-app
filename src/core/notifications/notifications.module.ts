import { type DynamicModule, Module } from '@nestjs/common';
import {
  INotificationsModuleAsyncOptions,
  INotificationsModuleOptions,
  NOTIFICATIONS_OPTIONS_TOKEN,
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
          provide: NOTIFICATIONS_OPTIONS_TOKEN,
          useValue: options,
        },
        NotificationsService,
      ],
    };
  }

  static forRootAsync(options: INotificationsModuleAsyncOptions): DynamicModule {
    return {
      ...this.sharedConfig(options),
      imports: options.imports || [],
      providers: [
        {
          provide: NOTIFICATIONS_OPTIONS_TOKEN,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        NotificationsService,
      ],
    };
  }
}
