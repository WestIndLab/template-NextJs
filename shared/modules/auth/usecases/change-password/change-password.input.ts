import { z } from 'zod';

// Schéma de validation avec Zod
export const changePasswordSchema = z.object({
  id: z.string().min(1, 'ID requis'),
  newPassword: z.string().min(1, 'Nouveau mot de passe requis'),
});

// Type inféré automatiquement à partir du schéma
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// Type des erreurs de validation
export type ChangePasswordValidationError = z.ZodError<ChangePasswordInput>;
