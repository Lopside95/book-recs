import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/server/db";
import { Book, booksSchema, findBookSchema } from "@/types/books";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const AllOptions = () => {
  const { data: books } = trpc.books.getAllBooks.useQuery();

  const form = useForm<Book>({
    resolver: zodResolver(booksSchema),
    defaultValues: {},
  });

  const newAuthor = trpc.books.createAuthor.useMutation({
    onSuccess: () => console.log("author created"),
    onError: (error) => console.error("Error creating author:", error),
  });

  console.log("books", books);

  const utils = trpc.useUtils();

  // const booksDictionary = books?.reduce((acc, book) => {
  //   const id = book.id
  // })

  const allAuthors = books?.map((book) => book.author);

  // console.log("allAuthors", allAuthors);

  const { data: authors } = trpc.books.getAuthors.useQuery();

  console.log("authors", authors);

  const handleCreate = () => {
    allAuthors?.forEach(async (author) => {
      await newAuthor.mutateAsync({ author: author });
      console.log("author", author);
      await utils.books.invalidate();
    });
  };

  const onSubmit: SubmitHandler<Book> = async (data: Book) => {
    console.log("data", data.author);

    try {
      await newAuthor.mutateAsync({ author: data.author });
    } catch (error) {
      console.error(error);
    }
    // await newAuthor.mutateAsync({ author: data.author });
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col pt-20 gap-4 items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input {...form.register("author")} className="w-96" />
        <Button type="submit">Submit</Button>

        {/* {books?.map((book) => {
          return <li key={book.id}>{book.author}</li>;
        })} */}
        <Button onClick={handleCreate}>Create</Button>
      </form>
    </FormProvider>
  );
};

export default AllOptions;
