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
});

export type Book = z.infer<typeof booksSchema>;
export type CreateBookForm = z.infer<typeof createBookSchema>;

export interface CloudInfo {
  times: number;
  setTimes: React.Dispatch<SetStateAction<number>>;
  bookRec?: Book;
}
