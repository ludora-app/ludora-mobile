import { z } from 'zod';

export const formSchema = z
  .object({
    confirmPassword: z.string({ error: 'Confirmation du mot de passe est requise' }),
    email: z.email({ message: 'Email invalide' }),
    firstname: z.string({ error: 'Ce champ est requis' }),
    lastname: z.string({ error: 'Ce champ est requis' }),
    password: z
      .string({ error: 'Mot de passe est requis' })
      .min(12, { error: 'Le mot de passe doit contenir au moins 12 caractères' })
      .refine(val => /[a-z]/.test(val), { error: 'Le mot de passe doit contenir au moins une minuscule' })
      .refine(val => /[A-Z]/.test(val), { error: 'Le mot de passe doit contenir au moins une majuscule' })
      .refine(val => /[^a-zA-Z0-9]/.test(val), {
        error: 'Le mot de passe doit contenir au moins un caractère spécial',
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword'],
      });
    }
  });

export type formSchemaType = z.infer<typeof formSchema>;
