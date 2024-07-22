import { z } from "zod";

export const booksSchema = z.object({
  genre: z.string().optional(),
  author: z.string().optional(),
  title: z.string().optional(),
  rating: z.string().optional(),
});

export type Books = z.infer<typeof booksSchema>;
