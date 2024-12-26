import { initializeConfig } from '@template/shared/conf/config';

export function initializeAppConfig(): void {
  const requiredEnvVars: Record<string, string | undefined> = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    environment: process.env.NODE_ENV,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(`Variables d'environnement manquantes : ${missingVars.join(', ')}`);
  }

  initializeConfig({
    apiUrl: process.env.NEXT_PUBLIC_API_URL!,
    environment: process.env.NODE_ENV!,
  });
}
