import { trpc } from "@/utils/trpc";
import { getQueryKey } from "@trpc/react-query";
import { Input } from "./ui/input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useState } from "react";
import { Books, booksSchema } from "@/types/books";
import { zodResolver } from "@hookform/resolvers/zod";

const BookForm = () => {
  const [chosenAuthor, setChosenAuthor] = useState<string>();

  const [bookRec, setBookRec] = useState<Books>();

  const form = useForm<Books>({
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

  const onSubmit: SubmitHandler<Books> = async (data: Books) => {
    setChosenAuthor(data.author);
    console.log("data", data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-blue-500">
          <Input {...form.register("author")} />
        </div>
        <div>
          {books?.map((book) => {
            return (
              <ul key={book.id}>
                <span className="flex">
                  <li> {book.title}</li>
                  <li>{book.author}</li>
                </span>
              </ul>
            );
          })}
        </div>
        <Button type="submit">Submit</Button>
        <Button onClick={handleFind}>Find</Button>
      </form>
    </FormProvider>
  );
};

export default BookForm;
