import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "../db";

// const createTRPCContext = (opts: CreateContextOptions) => {
//   return prisma;
// };

export const createTRPCContext = (opts: CreateNextContextOptions) => {
  return prisma;
};

// export const createTRPCContext = async (opts: CreateNextContextOptions) => {
//   const { req, res } = opts;

//   // const session = await getServerAuthSession({ req, res });

//   return createContext({});
// };

// export type CreateContext = Awaited<ReturnType<typeof createTRPCContext>>;

// const t = initTRPC.context<CreateContext>().create();

// const t = initTRPC.create();

const t = initTRPC.context<BooksContext>().create();
export const createRouter = t.router;
export const publicProcedure = t.procedure;

export type BooksContext = Awaited<ReturnType<typeof createTRPCContext>>;
// export type Context = inferAsyncReturnType<typeof createContext>;
