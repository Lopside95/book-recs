import AuthorDropdown from "@/components/authorDropdown";
import { Button } from "@/components/ui/button";
import { Book, booksSchema } from "@/types/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const Menu = () => {
  const form = useForm<Book>({
    resolver: zodResolver(booksSchema),
  });

  const onSubmit: SubmitHandler<Book> = async (data: Book) => {};

  const author = form.getValues("author");

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col pt-20 gap-4 items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AuthorDropdown />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default Menu;
