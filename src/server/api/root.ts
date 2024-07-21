import { booksSchema } from "@/types/books";
import { createRouter, publicProcedure } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { prisma } from "../db";
import booksRouter from "./routers/booksRouter";

export const appRouter = createRouter({
  books: booksRouter,
});

export type AppRouter = typeof appRouter;
