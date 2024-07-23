import Image from "next/image";
import { Inter } from "next/font/google";
import Clouds from "@/components/clouds";
import { trpc } from "@/utils/trpc";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Book, booksSchema } from "@/types/books";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/textField";
import { Button } from "@/components/ui/button";
import React, { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";

const inter = Inter({ subsets: ["latin"] });

export type TextProps = {
  name: string;
  type?: string;
  label: string;
};

export type BookForm = {
  // books?: Book;
  isThinking?: boolean;
  setIsThinking: React.Dispatch<SetStateAction<boolean>>;
  times: number;
  setTimes: React.Dispatch<SetStateAction<number>>;
};

const Home = () => {
  const form = useForm<Book>({
    resolver: zodResolver(booksSchema),
  });
  const [times, setTimes] = useState<number>(6);

  const [bookRec, setBookRec] = useState<Book>();
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const { data: book } = trpc.books.getSingle.useQuery({
    author: form.watch("author") ?? "",
  });

  const onSubmit: SubmitHandler<Pick<Book, "author">> = async (data: Book) => {
    setTimes(0);
    setBookRec(book);
    console.log("bookRec", bookRec);
  };

  const handleGet = () => {};

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col pt-20 gap-4 items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <TextField label="Get By Author" name="author" />
        {/* <li>{book?.r}</li> */}
        {times}
        <div className="flex gap-4">
          {times === 4 && !isThinking ? (
            <div>
              <li>{bookRec?.title}</li>
              <li>{bookRec?.author}</li>
              <li>{bookRec?.genre}</li>
              <li>{bookRec?.rating}</li>
              {/* <li> {book?.title}</li>
              <li>{book?.author}</li>
              <li>{book?.genre}</li>
              <li>{book?.rating}</li> */}
            </div>
          ) : (
            <p>...</p>
          )}

          {/* <p>{books[0].title}</p> */}
          <Button type="submit">Get author</Button>
        </div>
        <Clouds
          setIsThinking={setIsThinking}
          isThinking={isThinking}
          setTimes={setTimes}
          times={times}
        />
        {/* <Clouds isThinking={isThinking} setIsThinking={setIsThinking} /> */}
        {/* <Button type="submit">Get author</Button> */}
        {/* <Clouds />
      <BookForm /> */}
      </form>
    </FormProvider>
  );
};

export default Home;
