import { z } from "zod";
import { AutorSchema } from "./Autor";

export const LibroSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  autor: AutorSchema,
  disponible: z.boolean(),
}).transform((data) => ({
  id: Number(data.id),
  titulo: String(data.titulo),
  autor: AutorSchema.parse(data.autor),
  disponible: Boolean(data.disponible),
}));

export type Libro = z.infer<typeof LibroSchema>;