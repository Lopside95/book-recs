import { booksSchema } from "@/types/books";
import { createRouter, publicProcedure } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { prisma } from "../db";

export const appRouter = createRouter({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

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
});

export type AppRouter = typeof appRouter;
