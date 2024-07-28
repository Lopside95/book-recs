import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type BarProps = {
  rating?: number;
};

const RatingBar = ({ rating }: BarProps) => {
  const [score, setScore] = useState<number>();

  useEffect(() => {
    setScore(rating / 10);
  }, [rating]);

  return (
    <motion.div
      initial={{
        scaleX: 1,
        scaleY: 0,
      }}
      animate={{
        scaleY: score,
        transformOrigin: "bottom",
      }}
      transition={{
        duration: 0.7,
      }}
      className="h-14 w-8 bg-black"
    ></motion.div>
  );
};

export default RatingBar;
