import { z } from "zod";

export const booksSchema = z.object({
  genre: z.string(),
  author: z.string(),
  title: z.string(),
});

export type Books = z.infer<typeof booksSchema>;
