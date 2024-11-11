import { Book } from "@/types/books";
import React from "react";
import RatingBar from "./ratingBar";
import { motion, useAnimationControls } from "framer-motion";

const Cover = ({ title, author, genre, rating }: Book) => {
  return (
    <div className="w-[35rem]  items-center justify-evenly flex gap-14 h-[300px]">
      <div className="flex flex-col gap-5">
        <motion.h1
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -40 }}
          style={{ fontStyle: "italic" }}
          transition={{ duration: 0.9 }}
        >
          {title}
        </motion.h1>
        <motion.h1
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.7 }}
        >
          {author}
        </motion.h1>
        <motion.h1
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.7 }}
        >
          {genre}
        </motion.h1>
      </div>
      {/* <RatingBar rating={rating} /> */}
    </div>
  );
};

export default Cover;
