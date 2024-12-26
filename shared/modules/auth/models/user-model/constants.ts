import { UserPreferences } from './types';

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'light',
  notifications: true,
  language: 'fr',
} as const;
