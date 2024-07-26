import AuthorDropdown from "@/components/authorDropdown";
import { Button } from "@/components/ui/button";
import { Book, booksSchema } from "@/types/books";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const Menu = () => {
  const form = useForm<Book>({
    resolver: zodResolver(booksSchema),
  });

  const [books, setBooks] = useState<Book[]>();

  // const author = form.getValues("author");
  const author = form.watch("author");

  const { data: biblio, refetch } = trpc.booksByAuthor.useQuery(
    { author },
    { enabled: false }
  );

  const onSubmit: SubmitHandler<Book> = async (data: Book) => {
    refetch();
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col pt-20 gap-4 items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AuthorDropdown />
        {biblio?.map((book) => {
          return (
            <ul key={book.id}>
              <li>{book.title}</li>
              <li> {book.author.name}</li>
              <li>{book.genre.name}</li>
              <li>Rating: {book.rating}</li>
            </ul>
          );
        })}
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default Menu;

{
  /* <li>
  {book.title}, {book.author.name}
</li> */
}
