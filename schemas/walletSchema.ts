import { z } from "zod";

export const walletSchema = z.object({
  name: z.string().min(1, "Informe o nome da carteira"),
  image: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Selecione uma imagem para a carteira",
  }),
});

export type WalletSchemaType = z.infer<typeof walletSchema>;
