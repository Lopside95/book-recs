import "@/styles/globals.css";
import { trpc } from "@/utils/trpc";
import type { AppProps, AppType } from "next/app";
import { FormProvider, useForm } from "react-hook-form";

const MyApp: AppType = ({ Component, pageProps }) => {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <Component {...pageProps} />;
    </FormProvider>
  );
};
export default trpc.withTRPC(MyApp);

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
