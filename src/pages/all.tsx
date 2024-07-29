import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/server/db";
import { Book, booksSchema } from "@/types/books";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const AllOptions = () => {
  const { data: books } = trpc.getBooks.useQuery();

  const form = useForm<Book>({
    resolver: zodResolver(booksSchema),
    defaultValues: {},
  });

  console.log("books", books);

  const utils = trpc.useUtils();

  const allAuthors = books?.map((book) => book.authorId);

  // console.log("allAuthors", allAuthors);

  const { data: authors } = trpc.getAuthors.useQuery(undefined, {
    enabled: false,
  });

  console.log("authors", authors);

  // console.log("authors", authors);

  const onSubmit: SubmitHandler<Book> = async (data: Book) => {
    console.log("data", data.author);
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col pt-20 gap-4 items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input {...form.register("title")} className="w-96" />
        <Button type="submit">Submit</Button>
        <div></div>
        {/* {books?.map((book) => {
          return <li key={book.id}>{book.author}</li>;
        })} */}
        {/* <Button onClick={handleCreate}>Create</Button> */}
      </form>
    </FormProvider>
  );
};

export default AllOptions;
