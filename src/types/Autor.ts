import { z } from "zod";

export const AutorSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  nacionalidad: z.string(),
}).transform((data) => ({
  id: Number(data.id),
  nombre: String(data.nombre),
  nacionalidad: String(data.nacionalidad),
}));

export type Autor = z.infer<typeof AutorSchema>;