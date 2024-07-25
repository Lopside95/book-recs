import { trpc } from "@/utils/trpc";
import type { Author } from "@prisma/client";

const NewAuthor = () => {
  // const getAuthorsBooks = trpc.author.booksByAuthor.useQuery({
  //   author: "Don DeLillo",
  // });

  // console.log("getAuthorsBooks", getAuthorsBooks);

  // const handleCreate = () => {
  //   allAuthors?.forEach(async (author) => {
  //     await newAuthor.mutateAsync({ author: author });
  //     console.log("author", author);
  //     await utils.books.invalidate();
  //   });
  // };

  const newAuthor = trpc.author.createAuthor.useMutation({
    onSuccess: () => console.log("author created"),
    onError: (error) => console.error("Error creating author:", error),
  });

  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
};

export default NewAuthor;
