import Image from "next/image";
import { Inter } from "next/font/google";
import Books from "@/components/books";
import Clouds from "@/components/clouds";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Clouds />
      <Books />
    </main>
  );
}
