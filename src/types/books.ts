import { z } from "zod";

export const booksSchema = z.object({
  genre: z.string().optional(),
  author: z.string().optional(),
  title: z.string().optional(),
  rating: z.string().optional(),
});

export const createBookSchema = z.object({
  title: z.string().min(1, "need title"),
  genre: z.string().min(1, "need genre"),
  author: z.string().min(1, "need author"),
  rating: z.number().min(1, "need rating").max(10),
  // authorId: z.string().optional(),
  // genreId: z.string().optional(),
});

// export const booksSchema = z.object({
//   genre: z.string(),
//   author: z.string(),
//   title: z.string(),
//   rating: z.string(),
// });

export type Book = z.infer<typeof booksSchema>;
export type CreateBookForm = z.infer<typeof createBookSchema>;
