import "@/styles/globals.css";
import { trpc } from "@/utils/trpc";
import type { AppProps, AppType } from "next/app";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
export default trpc.withTRPC(MyApp);

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
