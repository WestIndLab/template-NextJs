import { CommonErrorCode, Result } from '@/types/common';
import { UserErrorCode, UserProfile } from '../../models/user-model/types';

export type LoginErrorCode = UserErrorCode | CommonErrorCode | 'INVALID_CREDENTIALS';

export type LoginOutput = Result<UserProfile, LoginErrorCode>;
