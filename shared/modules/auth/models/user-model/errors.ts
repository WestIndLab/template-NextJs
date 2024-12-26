import { COMMON_ERROR_MESSAGES, CommonErrorCode } from '@template/shared/types/common';
import { USER_ERROR_MESSAGES, UserErrorCode } from './types';

export class UserError extends Error {
  constructor(
    public readonly code: UserErrorCode | CommonErrorCode,
    message?: string,
  ) {
    super(
      message ??
        (code in USER_ERROR_MESSAGES ? USER_ERROR_MESSAGES[code as UserErrorCode] : undefined) ??
        (code in COMMON_ERROR_MESSAGES
          ? COMMON_ERROR_MESSAGES[code as CommonErrorCode]
          : undefined) ??
        'Une erreur est survenue',
    );
    this.name = 'UserError';
  }
}
