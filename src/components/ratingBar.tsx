import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

type BarProps = {
  rating?: number;
};

// Add a default value for the rating prop
const RatingBar = ({ rating }: BarProps) => {
  const controls = useAnimationControls();

  const [score, setScore] = useState<number | undefined>(0);

  const handleScore = async () => {
    if (rating !== undefined) {
      setScore(rating / 10);
    }
    // await setScore(rating / 10);

    // await controls.start("reset");
    // // setScore(rating / 10);
    // setTimeout(() => {
    //   controls.start("go");
    // }, 400);

    // setScore(rating / 10);
  };

  useEffect(() => {
    handleScore();

    // setScore(rating / 10);
    // handleScore();
    // setScore(0);
    // setScore(rating / 10);
  }, [rating]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          scaleX: 1,
          scaleY: 0,
        }}
        animate={{
          scaleY: score,
          transformOrigin: "bottom",
          transition: {
            duration: 0.7,
          },
        }}
        className="h-32 w-10 bg-black relative flex justify-center "
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-white text-2xl pt-5 ease-in delay-1000"
        >
          {rating}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};
export default RatingBar;

// initial="initial"
// variants={{
//   reset: {
//     scaleX: 0,
//     transition: {
//       duration: 0,
//     },
//   },
//   go: {
//     scaleY: score,
//     transformOrigin: "bottom",
//     transition: {
//       duration: 0.7,
//     },
//   },
//   initial: {
//     scaleX: 1,
//     scaleY: 0,
//   },
// }}
// animate={controls}
//
