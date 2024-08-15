import { Book } from "@/types/books";
import React from "react";
import RatingBar from "./ratingBar";

const Cover = ({ title, author, genre, rating }: Book) => {
  return (
    <div className="w-96 pt-10 pl-20 flex gap-10 h-[400px] border">
      <div className="flex flex-col gap-2">
        <h1 style={{ fontStyle: "italic" }}>{title}</h1>
        <p>{author}</p>
        <p>{genre}</p>
      </div>
      <RatingBar rating={rating} />
    </div>
  );
};

export default Cover;
