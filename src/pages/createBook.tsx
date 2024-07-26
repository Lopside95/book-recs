import TextField from "@/components/textField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateBookForm, createBookSchema } from "@/types/books";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const CreateBook = () => {
  const form = useForm<CreateBookForm>({
    resolver: zodResolver(createBookSchema),
    defaultValues: { rating: 9 },
  });

  const createNewBook = trpc.createBook.useMutation({
    onSuccess: () => console.log("new Book created"),
  });

  const onSubmit: SubmitHandler<CreateBookForm> = async (
    data: CreateBookForm
  ) => {
    try {
      await createNewBook.mutateAsync(data);
      console.log("it worked!", data);
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
        <TextField label="Title" name="title" />
        <TextField label="Author" name="author" />
        <TextField label="genre" name="genre" />
        <Input
          {...form.register("rating")}
          type="number"
          className="w-80"
          placeholder="rating"
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default CreateBook;
