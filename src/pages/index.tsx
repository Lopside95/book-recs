import Clouds, { CloudPic } from "@/components/clouds";
import { trpc } from "@/utils/trpc";
import { Book } from "@/types/books";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export type TextProps = {
  name: string;
  type?: string;
  label: string;
};

const FullRandom = () => {
  const [times, setTimes] = useState<number>(5);

  const { data: book, refetch, isLoading } = trpc.getRandom.useQuery();

  const [bookRec, setBookRec] = useState<Book>();
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const handleClick = async () => {
    setTimes(0);
    await refetch();
    setBookRec({
      author: book?.author.name,
      genre: book?.genre.name,
      title: book?.title,
      rating: book?.rating,
    });
  };

  useEffect(() => {
    refetch();
    setBookRec({
      author: book?.author.name,
      genre: book?.genre.name,
      title: book?.title,
      rating: book?.rating,

      // author: "Daniel Keyes",
      // genre: "Sicence Fiction",
      // title: "Flowers for Algernon",
      // rating: 9,
    });
  }, []);

  useEffect(() => {
    if (book) {
      setPageLoading(false);
    }
  }, [book]);

  if (pageLoading) {
    return (
      <div className="self-center w-32 mt-40 justify-self-center">
        <CloudPic show={true} text="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col relative mt-20 justify-center lg:pt-20 gap-4 h-full items-center">
      <Clouds bookRec={bookRec} setTimes={setTimes} times={times} />
      {times >= 3 && (
        <Button
          className="lg:absolute bottom-20 lg:bottom-14 "
          onClick={handleClick}
          variant="outline"
        >
          What should I read next?
        </Button>
      )}
    </div>
  );
};

export default FullRandom;
