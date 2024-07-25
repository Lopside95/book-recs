import { booksSchema } from "@/types/books";
import { createRouter, publicProcedure } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { prisma } from "../db";

export const appRouter = createRouter({
  getBooks: publicProcedure.query(async () => {
    try {
      const books = await prisma.book.findMany();
      return books;
    } catch (error) {
      if (error instanceof TRPCError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }
  }),

  getBook: publicProcedure.input(booksSchema).query(async ({ input }) => {
    const theBook = await prisma.book.findFirst({
      where: {
        title: input.title,
      },
    });

    return theBook;
  }),
  getAuthors: publicProcedure.query(async () => {
    const authors = prisma.author.findMany();

    return authors;
  }),
  booksByAuthor: publicProcedure.input(booksSchema).query(async ({ input }) => {
    const author = await prisma.author.findFirst({
      where: {
        name: input.author,
      },
    });

    if (!author) {
      console.log("cant find author");
    }

    const biblio = await prisma.book.findMany({
      where: {
        authorId: author?.id,
      },
      include: {
        author: true,
        genre: true,
      },
    });

    return biblio;
  }),

  // books: booksRouter,
  // author: authorRouter,
});

export type AppRouter = typeof appRouter;
