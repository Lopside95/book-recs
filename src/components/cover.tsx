import { Book } from "@/types/books";
import React from "react";
import RatingBar from "./ratingBar";

const Cover = ({ title, author, genre, rating }: Book) => {
  return (
    <div className="w-[35rem]  items-center justify-evenly flex gap-14 h-[300px] border">
      <div className="flex flex-col gap-5">
        <h1 style={{ fontStyle: "italic" }}>{title}</h1>
        <h1>{author}</h1>
        <h1>{genre}</h1>
      </div>
      <RatingBar rating={rating} />
    </div>
  );
};

export default Cover;
