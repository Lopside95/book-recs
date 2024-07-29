import React, { SetStateAction } from "react";
import { z } from "zod";

export const booksSchema = z.object({
  genre: z.string().optional(),
  author: z.string().optional(),
  title: z.string().optional(),
  rating: z.number().optional(),
});

export const createBookSchema = z.object({
  title: z.string().min(1, "need title").trim(),
  genre: z.string().min(1, "need genre").trim(),
  author: z.string().min(1, "need author").trim(),
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

export interface CloudInfo {
  times: number;
  setTimes: React.Dispatch<SetStateAction<number>>;
  bookRec?: Book;
  // book?: Book;
  // isThinking?: boolean;
  // setIsThinking: React.Dispatch<SetStateAction<boolean>>;
}
