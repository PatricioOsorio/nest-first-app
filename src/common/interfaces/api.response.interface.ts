export interface IApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
  durationMs: number;
}
