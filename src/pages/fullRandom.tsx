import Image from "next/image";
import { Inter } from "next/font/google";
import Clouds from "@/components/clouds";
import { trpc } from "@/utils/trpc";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Book, booksSchema } from "@/types/books";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/textField";
import { Button } from "@/components/ui/button";
import React, { SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { register } from "module";
import RatingBar from "@/components/ratingBar";

const inter = Inter({ subsets: ["latin"] });

export type TextProps = {
  name: string;
  type?: string;
  label: string;
};

// export type BookForm = {
//   // books?: Book;
//   isThinking?: boolean;
//   setIsThinking: React.Dispatch<SetStateAction<boolean>>;
//   times: number;
//   setTimes: React.Dispatch<SetStateAction<number>>;
// };

const FullRandom = () => {
  const form = useForm<Book>({
    resolver: zodResolver(booksSchema),
  });
  const [times, setTimes] = useState<number>(6);

  const { data: book, refetch } = trpc.getRandom.useQuery(undefined, {
    enabled: false,
  });

  const [bookRec, setBookRec] = useState<Book>();
  // const [isThinking, setIsThinking] = useState<boolean>(false);

  // const onSubmit: SubmitHandler<Book> = async () => {};

  const handleClick = async () => {
    setTimes(0);
    await refetch();
    setBookRec({
      author: book?.author.name,
      genre: book?.genre.name,
      title: book?.title,
      rating: book?.rating,
    });
    console.log("book", book);
  };

  useEffect(() => {
    refetch();
  }, []);

  //todo: add delay

  return (
    <div className="flex justify-center pt-20 gap-4 items-center">
      <Clouds setTimes={setTimes} times={times} bookRec={bookRec} />
      <div className="">
        {times > 2 && <div>{bookRec?.title}</div>}
        {times > 1 && <div>{bookRec?.author}</div>}
        {times > 0 && <div>{bookRec?.genre}</div>}

        <RatingBar rating={bookRec?.rating} />

        <Button onClick={handleClick}>find a book</Button>
      </div>
    </div>
  );
};

export default FullRandom;
