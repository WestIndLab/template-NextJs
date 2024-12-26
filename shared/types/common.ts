export enum CommonErrorCode {
  DATABASE_ERROR = 'DATABASE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export const COMMON_ERROR_MESSAGES = {
  [CommonErrorCode.DATABASE_ERROR]: 'Erreur de base de données',
  [CommonErrorCode.NETWORK_ERROR]: 'Erreur de réseau',
  [CommonErrorCode.UNAUTHORIZED]: 'Non authentifié',
  [CommonErrorCode.FORBIDDEN]: 'Non autorisé',
  [CommonErrorCode.NOT_FOUND]: 'Ressource non trouvée',
  [CommonErrorCode.VALIDATION_ERROR]: 'Erreur de validation',
  [CommonErrorCode.UNKNOWN_ERROR]: 'Une erreur inattendue est survenue',
} as const;

export interface ValidationError {
  field: string;
  message: string;
}

export interface BaseError<T extends string> {
  code: T | CommonErrorCode;
  message: string;
  validationErrors?: ValidationError[];
}

export interface SuccessResult<T> {
  success: true;
  data: T;
}

export interface ErrorResult<E extends string> {
  success: false;
  error: BaseError<E>;
}

export type Result<T, E extends string> = SuccessResult<T> | ErrorResult<E>;
