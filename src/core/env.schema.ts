import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.preprocess(Number, z.number().int().min(1).max(65535)),
  APP_NAME: z.string(),
  API_KEY: z.string().default('nest-sandbox-secret-key'),
});

export type IEnvSchema = z.infer<typeof envSchema>;
