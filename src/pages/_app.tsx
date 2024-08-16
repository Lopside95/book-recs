import Nav from "@/components/nav";
import "@/styles/globals.css";
import { trpc } from "@/utils/trpc";
import { Metadata } from "next";
import type { AppProps, AppType } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { FormProvider, useForm } from "react-hook-form";

export const metadata: Metadata = {
  title: "Book Recommendations",
  description: "From me!",
};

export const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  const form = useForm();

  return (
    <>
      <Head>
        <link rel="icon" href="/athena.png" />
      </Head>
      <FormProvider {...form}>
        {/* <Nav /> */}
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </FormProvider>
    </>
  );
};
export default trpc.withTRPC(MyApp);
