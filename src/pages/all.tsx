import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, booksSchema, findBookSchema } from "@/types/books";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const AllOptions = () => {
  const { data: books } = trpc.books.getAllBooks.useQuery();

  const form = useForm<Book>({
    resolver: zodResolver(findBookSchema),
    defaultValues: {},
  });

  console.log("books", books);

  const utils = trpc.useUtils();

  const generateNewAuthor = trpc.books.generateAuthors.useMutation({
    onSuccess: async () => {
      console.log("success");
      utils.books.invalidate();
    },
  });

  const onSubmit: SubmitHandler<Book> = async (data: Book) => {
    console.log("data", data);

    try {
      await generateNewAuthor.mutateAsync(data.author);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col pt-20 gap-4 items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input {...form.register("author")} className="w-96" />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default AllOptions;
