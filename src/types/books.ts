import { z } from "zod";

export const booksSchema = z.object({
  genre: z.string().optional(),
  author: z.string().min(1, "need author"),
  title: z.string().optional(),
  rating: z.string().optional(),
});

// export const booksSchema = z.object({
//   genre: z.string(),
//   author: z.string(),
//   title: z.string(),
//   rating: z.string(),
// });

export type Book = z.infer<typeof booksSchema>;
