import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/server/db";
import { Book, booksSchema, findBookSchema } from "@/types/books";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const Author = () => {
  const form = useForm<Book>({
    resolver: zodResolver(booksSchema),
    defaultValues: {
      author: "",
    },
  });

  const [theBooks, setTheBooks] = useState<Book[]>([]);

  const utils = trpc.useUtils();

  const { data: books, refetch } = trpc.author.booksByAuthor.useQuery(
    { author: form.getValues("author") },
    { enabled: false }
  );

  const handleSet = () => {
    console.log("books", books);
    // form.setValue("author", form.watch("author"));
  };

  console.log("books", books);
  console.log(form.getValues("author"));

  const onSubmit: SubmitHandler<Book> = async (data: Book) => {
    console.log("data", data.author);
    refetch();
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col pt-20 gap-4 items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        Author
        <Input {...form.register("author")} className="w-96" />
        <Button type="submit">Submit</Button>
        {books !== undefined
          ? books.map((book) => {
              return (
                <ul key={book.id}>
                  <li>{book.genre}</li>
                  <li>{book.rating}</li>
                  <li>{book.title}</li>
                  {/* <li>{book.author ? book.author : ""}</li> */}
                </ul>
              );
            })
          : ""}
        <Button onClick={handleSet}>Set</Button>
        {/* <div></div> */}
      </form>
    </FormProvider>
  );
};

export default Author;
