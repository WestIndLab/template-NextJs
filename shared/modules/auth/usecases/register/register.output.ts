import { CommonErrorCode, Result } from '@/types/common';
import { UserErrorCode } from '../../models/user-model/types';

export type RegisterErrorCode = UserErrorCode | CommonErrorCode;

export type RegisterOutput = Result<void, RegisterErrorCode>;
