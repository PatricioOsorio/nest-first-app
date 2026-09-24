import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: unknown, _metadata: ArgumentMetadata) {
    if (typeof value === 'string') return value.trim();

    if (isPlainObj(value)) return trimObject(value);

    return value;
  }
}

const isPlainObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' &&
  v !== null &&
  (Object.getPrototypeOf(v) === null ||
    Object.getPrototypeOf(v) === Object.prototype);

function trimObject<T>(val: T): T {
  if (typeof val === 'string') return val.trim() as unknown as T;
  if (!isPlainObj(val)) return val;

  return Object.fromEntries(
    Object.entries(val).map(([k, v]) => [k, trimObject(v)]),
  ) as T;
}
