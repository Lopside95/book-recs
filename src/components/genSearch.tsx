import { trpc } from "@/utils/trpc";
import type { Author } from "@prisma/client";

const GenSearch = () => {
  // const getAuthorsBooks = trpc.author.booksByAuthor.useQuery({
  //   author: "Don DeLillo",
  // });

  // console.log("getAuthorsBooks", getAuthorsBooks);

  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
};

export default GenSearch;
