import { CommonErrorCode } from '@/types/common';
import { z } from 'zod';
import { IAuthRepository } from '../../gateway/IAuthRepository';
import { User } from '../../models/user-model';
import { UserError } from '../../models/user-model/errors';
import { RegisterInput, registerSchema } from './register.input';
import { RegisterOutput } from './register.output';

export class RegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(input: RegisterInput): Promise<RegisterOutput> {
    try {
      const validatedInput = registerSchema.parse(input);

      const user = new User({ ...validatedInput });

      await this.authRepository.register(user);

      return {
        success: true,
        data: undefined,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.errors.map((err: z.ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return {
          success: false,
          error: {
            code: CommonErrorCode.VALIDATION_ERROR,
            message: 'Validation failed',
            validationErrors: validationErrors,
          },
        };
      }

      if (error instanceof UserError) {
        return {
          success: false,
          error: {
            code: error.code,
            message: error.message,
          },
        };
      }

      return {
        success: false,
        error: {
          code: CommonErrorCode.UNKNOWN_ERROR,
          message: 'An unexpected error occurred',
        },
      };
    }
  }
}
