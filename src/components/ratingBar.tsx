import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type BarProps = {
  rating?: number;
};

const RatingBar = ({ rating }: BarProps) => {
  const [score, setScore] = useState<number | undefined>(0);

  const handleScore = () => {
    if (rating !== undefined) {
      setScore(rating / 10);
    }
  };

  useEffect(() => {
    handleScore();
  }, [rating]);

  return (
    <AnimatePresence>
      <motion.div
        animate={{
          scaleY: score,
          transformOrigin: "bottom",
          transition: {
            duration: 0.7,
          },
        }}
        className="h-32 w-10 bg-black relative flex justify-center"
        initial={{
          scaleX: 1,
          scaleY: 0,
        }}
      >
        <motion.p
          animate={{ opacity: 1 }}
          className="text-white text-[20px] pt-5 ease-in delay-1000"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.7 }}
        >
          {rating}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default RatingBar;
