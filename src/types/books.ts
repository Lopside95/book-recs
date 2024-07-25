import { z } from "zod";

export const booksSchema = z.object({
  genre: z.string().optional(),
  author: z.string().optional(),
  title: z.string().optional(),
  rating: z.string().optional(),
});

export const findBookSchema = z.object({
  title: z.string(),
  genre: z.string(),
  author: z.string(),
  rating: z.number(),
});

// export const booksSchema = z.object({
//   genre: z.string(),
//   author: z.string(),
//   title: z.string(),
//   rating: z.string(),
// });

export type Book = z.infer<typeof booksSchema>;
