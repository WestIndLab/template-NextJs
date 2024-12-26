import { z } from 'zod';

// Schéma de validation avec Zod
export const loginSchema = z.object({
  email: z.string()
    .email('Format email invalide')
    .min(1, 'Email requis'),
  password: z.string()
    .min(1, 'Mot de passe requis'),
});

// Type inféré automatiquement à partir du schéma
export type LoginInput = z.infer<typeof loginSchema>;

// Type des erreurs de validation
export type LoginValidationError = z.ZodError<LoginInput>;
