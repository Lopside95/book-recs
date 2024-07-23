import { Book, booksSchema } from "@/types/books";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const AllOptions = () => {
  const { data: books } = trpc.books.getAllBooks.useQuery();

  const form = useForm<Book>({
    resolver: zodResolver(booksSchema),
    defaultValues: {},
  });

  console.log("books", books);

  const onSubmit: SubmitHandler<Book> = async (data: Book) => {
    console.log("data", data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col pt-20 gap-4 items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      ></form>
    </FormProvider>
  );
};

export default AllOptions;
