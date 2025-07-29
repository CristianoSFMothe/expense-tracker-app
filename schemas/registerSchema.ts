import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.email("E-mail inválido").trim(),
  password: z
    .string()
    .trim()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(20, "A senha deve ter no máximo 20 caracteres")
    .superRefine((value, ctx) => {
      if (!/[A-Z]/.test(value)) {
        ctx.addIssue({
          code: "custom",
          message: "A senha deve conter pelo menos uma letra maiúscula",
        });
      }
      if (!/[a-z]/.test(value)) {
        ctx.addIssue({
          code: "custom",
          message: "A senha deve conter pelo menos uma letra minúscula",
        });
      }
      if (!/[0-9]/.test(value)) {
        ctx.addIssue({
          code: "custom",
          message: "A senha deve conter pelo menos um número",
        });
      }
      if (!/[^A-Za-z0-9]/.test(value)) {
        ctx.addIssue({
          code: "custom",
          message: "A senha deve conter pelo menos um caractere especial",
        });
      }
    }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
