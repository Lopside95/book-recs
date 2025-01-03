import { AppRouter } from "@/server/api/root";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_URL) {
    return `https://${process.env.NEXT_URL}`;
  } else {
    `http://localhost:${process.env.PORT ?? 3000}`;
  }
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,

          async headers() {
            return {};
          },
        }),
      ],
    };
  },
  ssr: false,
});
