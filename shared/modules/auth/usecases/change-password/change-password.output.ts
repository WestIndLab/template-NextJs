import { CommonErrorCode, Result } from '@/types/common';
import { UserErrorCode } from '../../models/user-model/types';

export type ChangePasswordErrorCode = UserErrorCode | CommonErrorCode;

export type ChangePasswordOutput = Result<void, ChangePasswordErrorCode>;
