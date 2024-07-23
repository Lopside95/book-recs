import { trpc } from "@/utils/trpc";
import { getQueryKey } from "@trpc/react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import React, { SetStateAction, useState } from "react";
import { Book, booksSchema } from "@/types/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Clouds from "@/components/clouds";
import TextField from "@/components/textField";

const BookFormPage = () => {
  const [chosenAuthor, setChosenAuthor] = useState<string>();
  const [isThinking, setIsThinking] = useState<boolean>(false);
  // const [times, setTimes] = useState<number>(6);

  const [bookRec, setBookRec] = useState<Book>();

  const form = useForm<Book>({
    resolver: zodResolver(booksSchema),
  });

  const { data: books } = trpc.books.booksByAuthor.useQuery({
    author: chosenAuthor ?? "",
  });

  const handleFind = async () => {
    if (books && books?.length > 0) {
      setBookRec(books[0]);
    }
    console.log("bookRec", bookRec);
  };

  const onSubmit: SubmitHandler<Book> = async (data: Book) => {
    setChosenAuthor(data.author);
    setTimes(0);
    setIsThinking(true);
    setTimeout(() => {
      setBookRec(books![0]);
    }, 2000);
    console.log("data", data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <Clouds
          isThinking={isThinking}
          setIsThinking={setIsThinking}
          times={times}
          setTimes={setTimes}
        />
        <div className="">
          <TextField name="author" label="Author" />
        </div>
        <div>
          {bookRec?.title}
          {/* {books?.map((book) => {
            return (
              <ul key={book.id}>
                <span className="flex">
                  <li> {book.title}</li>
                  <li>{book.author}</li>
                </span>
              </ul>
            );
          })} */}
        </div>
        <Button type="submit">Submit</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleFind;
          }}
        >
          Find
        </Button>
      </form>
    </FormProvider>
  );
};

export default BookFormPage;
