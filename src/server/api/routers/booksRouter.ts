import { prisma } from "@/server/db";
import { createRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { booksSchema, findBookSchema } from "@/types/books";
import { z } from "zod";

const booksRouter = createRouter({
  getBooks: publicProcedure.query(async () => {
    try {
      await prisma.book.findMany();
    } catch (error) {
      if (error instanceof TRPCError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }
  }),
  getAllBooks: publicProcedure.query(async () => {
    const allBooks = prisma.book.findMany();

    return allBooks;
  }),
  booksByAuthor: publicProcedure.input(booksSchema).query(async ({ input }) => {
    try {
      const books = await prisma.book.findMany({
        where: {
          authorId: input.author,
        },
      });
      return books;
    } catch (error) {
      console.error(error);
    }
  }),
  booksByGenre: publicProcedure.input(booksSchema).query(async ({ input }) => {
    const genreBooks = await prisma.book.findMany({
      where: {
        genreId: input.genre,
      },
    });

    return genreBooks;
  }),
  getSingle: publicProcedure.input(findBookSchema).query(async ({ input }) => {
    const chosenBook = await prisma.book.findFirst({
      where: {
        authorId: input.author,
      },
    });
    return chosenBook;
  }),
  getAuthors: publicProcedure.input(booksSchema).query(async () => {
    try {
      await prisma.author.findMany();
    } catch (error) {
      console.error(error);
    }
  }),
  generateAuthors: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const allBooks = await prisma.book.findMany();

      const newAuthor = await prisma.author.create({
        data: {
          name: input,
        },
      });

      return newAuthor;
      // const allAuthors = await prisma.book.findMany({
      //   where: {
      //     authorId: author
      //   }
      // })
    }),

  //   booksByAuthor: publicProcedure.query(async () => {
  //     const bibli = await prisma.books.findMany({
  //       where: {
  //         author: input.author,
  //       },
  //     });
  //     return bibli;
  //   }),
});

export default booksRouter;
