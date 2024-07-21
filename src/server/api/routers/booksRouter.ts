import { prisma } from "@/server/db";
import { createRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { booksSchema } from "@/types/books";

const booksRouter = createRouter({
  getBooks: publicProcedure.query(async () => {
    try {
      await prisma.books.findMany();
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
    const allBooks = prisma.books.findMany();

    return allBooks;
  }),
  booksByAuthor: publicProcedure.input(booksSchema).query(async ({ input }) => {
    try {
      const books = await prisma.books.findMany({
        where: {
          author: input.author,
        },
      });
      return books;
    } catch (error) {
      console.error(error);
    }
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
