import { z } from "zod";

export const productSchemas = z
    .object({
        name: z.string().min(1, "Nome é obrigatório"),

        sku: z.string().min(1, "SKU é obrigatório"),

        category: z.string().min(1, "Categoria é obrigatório"),

        price: z.coerce
            .number()
            .min(0, "Preço não pode ser negativo"),

        stock: z.coerce
            .number()
            .min(0, "estoque não pode ser negativo")
    })

    .refine(
        (data) => {
            if (data.category === "Eletrônicos") {
                return data.price >= 50;
            }

            return true;
        },
        {
            message:
                "Eletrônicos devem custar pelo menos R$ 50",
            path: ["price"]
        }
    )

export type Product = z.infer<typeof productSchemas>;