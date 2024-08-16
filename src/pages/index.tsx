import Clouds from "@/components/clouds";
import { trpc } from "@/utils/trpc";
import { Book } from "@/types/books";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

export type TextProps = {
  name: string;
  type?: string;
  label: string;
};

const FullRandom = () => {
  const [times, setTimes] = useState<number>(5);

  const { data: book, refetch } = trpc.getRandom.useQuery(undefined, {
    enabled: false,
  });

  const [bookRec, setBookRec] = useState<Book>();

  const handleClick = async () => {
    setTimes(0);
    await refetch();
    setBookRec({
      author: book?.author.name,
      genre: book?.genre.name,
      title: book?.title,
      rating: book?.rating,
    });
    console.log("book", book);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-col relative justify-center pt-20 gap-4 items-center">
      <Clouds bookRec={bookRec} setTimes={setTimes} times={times} />
      {times >= 4 && (
        <Button
          className="absolute bottom-14"
          onClick={handleClick}
          variant="outline"
        >
          What to read?
        </Button>
      )}
      <div className=""></div>
    </div>
  );
};

export default FullRandom;
