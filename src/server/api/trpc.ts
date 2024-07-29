import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "../db";

export const createTRPCContext = (opts: CreateNextContextOptions) => {
  return prisma;
};

const t = initTRPC.context<BooksContext>().create();
export const createRouter = t.router;
export const publicProcedure = t.procedure;

export type BooksContext = Awaited<ReturnType<typeof createTRPCContext>>;
