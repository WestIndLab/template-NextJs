import { z } from 'zod';

// Schéma de validation avec Zod
export const registerSchema = z.object({
  email: z.string()
    .email('Format email invalide')
    .min(1, 'Email requis'),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
  firstName: z.string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne doit pas dépasser 50 caractères'),
  lastName: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne doit pas dépasser 50 caractères'),
  avatar: z.string().url('URL invalide').optional(),
});

// Type inféré automatiquement à partir du schéma
export type RegisterInput = z.infer<typeof registerSchema>;

// Type des erreurs de validation
export type RegisterValidationError = z.ZodError;
