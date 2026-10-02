/* eslint-disable @typescript-eslint/no-explicit-any */
export const NOTIFICATIONS_OPTIONS_TOKEN = Symbol('NOTIFICATIONS_OPTIONS_TOKEN');

export type INotificationChannel = 'console' | 'silent';

export interface INotificationsModuleOptions {
  appName: string;
  channel?: INotificationChannel;
  isGlobal?: boolean;
}

export interface INotificationsModuleAsyncOptions {
  isGlobal?: boolean;
  imports?: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<INotificationsModuleOptions> | INotificationsModuleOptions;
  inject?: any[];
}

export interface INotificationResult {
  sentAt: Date;
  channel: INotificationChannel;
  delivered: boolean;
}
