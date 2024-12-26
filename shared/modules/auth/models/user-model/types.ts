import { BaseError } from '@/types/common';

export enum UserErrorCode {
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_NAME = 'INVALID_NAME',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
}

export const USER_ERROR_MESSAGES = {
  [UserErrorCode.INVALID_EMAIL]: 'Email invalide',
  [UserErrorCode.INVALID_NAME]: 'Nom invalide',
  [UserErrorCode.INVALID_PASSWORD]: 'Mot de passe invalide',
  [UserErrorCode.EMAIL_ALREADY_EXISTS]: 'Un utilisateur existe déjà avec cet email',
} as const;

export type UserError = BaseError<UserErrorCode>;

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: 'fr' | 'en';
}

export interface UserProfile {
  email: string;
  lastName: string;
  firstName: string;
  avatar?: string;
}

// Type pour un utilisateur non persisté (sans id)
export interface UnsavedUser {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  avatar?: string;
  preferences?: Partial<UserPreferences>;
  createdAt?: Date;
  lastLogin?: Date;
}

// Type pour un utilisateur persisté (avec id)
export interface SavedUser extends UnsavedUser {
  id: string;
  createdAt: Date;
  lastLogin: Date;
}

// Type union pour représenter tous les états possibles
export type User = SavedUser | UnsavedUser;

// Type guard pour vérifier si un utilisateur est persisté
export function isSavedUser(user: User): user is SavedUser {
  return 'id' in user;
}

// Type pour la création d'un utilisateur
export type CreateUserParams = Omit<UnsavedUser, 'createdAt' | 'lastLogin'>;
