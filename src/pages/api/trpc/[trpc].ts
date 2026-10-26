import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import * as trpcNext from "@trpc/server/adapters/next";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError: ({ path, error, type, input }) => {
    console.error(
      `❌ tRPC ${type} failed on ${path ?? "<no-path>"}: ${error.code} - ${
        error.message
      }`,
      { input, cause: error.cause, stack: error.stack }
    );
  },
});
