import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

type BarProps = {
  rating?: number;
};

const RatingBar = ({ rating }: BarProps) => {
  const controls = useAnimationControls();

  const [score, setScore] = useState<number | undefined>(0);

  const handleScore = async () => {
    await controls.start("reset");
    // setScore(rating / 10);
    setTimeout(() => {
      controls.start("go");
    }, 400);

    // setScore(rating / 10);
  };

  useEffect(() => {
    setScore(rating / 10);
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
        // exit={{
        //   scaleY: 0,
        //   transformOrigin: "top",
        //   transition: {
        //     duration: 0,
        //   },
        // }}
        // transition={{
        //   duration: 0.7,
        //   delay: 0.4,
        // }}
        className="h-20 w-6 bg-black"
      >
        <p className="text-white text-xl">{rating}</p>
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
