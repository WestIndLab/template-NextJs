import { z } from 'zod';

export const ConfigSchema = z.object({
  apiUrl: z.string().url(),
  environment: z.enum(['development', 'production', 'test']).default('development'),
});

export type Config = z.infer<typeof ConfigSchema>;

let globalConfig: Config | null = null;

export function initializeConfig(config: Config): void {
  const result = ConfigSchema.safeParse(config);

  if (result.success === false) {
    throw new Error(result.error.message);
  }

  globalConfig = result.data;
}

export function getConfig(): Config {
  if (globalConfig === null) {
    throw new Error('Configuration not initialized. Call initializeConfig first.');
  }
  return globalConfig;
}
