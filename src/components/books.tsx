import { trpc } from "@/utils/trpc";

const Books = () => {
  // const { data: books } = trpc.getBooks.useQuery();

  const { data: books } = trpc.simpleBooks.useQuery();

  console.log("books", books);

  return <div>Helllo</div>;
};

export default Books;
