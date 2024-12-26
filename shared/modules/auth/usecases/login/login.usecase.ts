import { CommonErrorCode } from '@/types/common';
import { z } from 'zod';
import { UserError } from '../../models/user-model/errors';
import { AuthRepository } from '../../repository/AuthRepository';
import { UserRepository } from '../../repository/UserRepository';
import { LoginInput, loginSchema } from './login.input';
import { LoginOutput } from './login.output';

export class LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    try {
      // 1. Validation des données
      loginSchema.parse(input);

      // 2. Vérification des credentials (la vérification réelle sera faite dans la couche application)
      return {
        success: true,
        data: {
          email: '',
          lastName: '',
          firstName: '',
        },
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
            message: 'Erreur de validation',
            validationErrors,
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
          message: 'Une erreur inattendue est survenue',
        },
      };
    }
  }
}
