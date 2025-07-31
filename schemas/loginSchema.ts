import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("E-mail inválido").trim(),
  password: z
    .string()
    .trim()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(20, "A senha deve ter no máximo 20 caracteres"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
