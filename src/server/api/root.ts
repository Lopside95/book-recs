import { booksSchema, createBookSchema } from "@/types/books";
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
  createBook: publicProcedure
    .input(createBookSchema)
    .mutation(async ({ input }) => {
      const newBook = await prisma.book.create({
        data: {
          title: input.title,
          rating: input.rating,
          genre: {
            connectOrCreate: {
              create: {
                name: input.genre,
              },
              where: {
                name: input.genre,
              },
            },
          },
          author: {
            connectOrCreate: {
              create: {
                name: input.author,
              },
              where: {
                name: input.author,
              },
            },
          },
        },
      });

      return newBook;

      // const genreName = await prisma.genre.findUnique({
      //   where: {
      //     id: input.genre
      //   }
      // })

      // const genreExists: boolean = genreName ? true : false

      // const newBook = await prisma.book.create({
      //   data: {
      //     title: input.title,
      //     rating: input.rating,
      //     genre: !genreExists ? input.genre : connect: {genre: genreId}
      //     // author: input.author,

      //   }
      // })
    }),
  getAuthors: publicProcedure.query(async () => {
    const authors = prisma.author.findMany();

    return authors;
  }),
  booksByAuthor: publicProcedure.input(booksSchema).query(async ({ input }) => {
    const author = await prisma.author.findUnique({
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
