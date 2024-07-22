import Image from "next/image";
import { Inter } from "next/font/google";
import Clouds from "@/components/clouds";
import BookForm from "@/components/bookForm";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-5 p-24 bg-gray-500 ${inter.className}`}
    >
      <div>Find Books</div>
      <BookForm />
    </main>
  );
};

export default Home;
