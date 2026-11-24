import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export const TOKEN_NOTIFICATIONS_OPTIONS = Symbol('NOTIFICATIONS_OPTIONS_TOKEN');

export type INotificationChannel = 'console' | 'silent';

export interface INotificationsModuleOptions {
  appName: string;
  channel?: INotificationChannel;
  isGlobal?: boolean;
}

export interface INotificationsModuleAsyncOptions {
  isGlobal?: boolean;
  imports?: ModuleMetadata['imports'];
  useFactory: (
    ...args: never[]
  ) => Promise<INotificationsModuleOptions> | INotificationsModuleOptions;
  inject?: FactoryProvider['inject'];
}

export interface INotificationResult {
  sentAt: Date;
  channel: INotificationChannel;
  delivered: boolean;
}
