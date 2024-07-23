import { prisma } from "@/server/db";
import { createRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { booksSchema } from "@/types/books";

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
  simpleBooks: publicProcedure.query(async () => {
    const allBooks = prisma.book.findMany();

    return allBooks;
  }),
  booksByAuthor: publicProcedure.input(booksSchema).query(async ({ input }) => {
    try {
      const books = await prisma.book.findMany({
        where: {
          author: input.author,
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
        genre: input.genre,
      },
    });

    return genreBooks;
  }),
  getSingle: publicProcedure.input(booksSchema).query(async ({ input }) => {
    const chosenBook = await prisma.book.findFirst({
      where: {
        author: input.author,
      },
    });
    return chosenBook;
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
