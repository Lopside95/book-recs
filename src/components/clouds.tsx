"use client";

import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Cloud = "sm" | "md" | "lg";

const Clouds = () => {
  const [isCloud, setIsCloud] = useState<Cloud>("sm");

  const cycle = useAnimationControls();

  const [times, setTimes] = useState<number>(0);

  const handleCycle = async () => {
    if (times < 1) {
      await cycle.start("show");
      await cycle.start("hide");
      setTimes(times + 1);
    }

    // else {
    //   setTimes(0);
    // }
  };

  useEffect(() => {
    handleCycle();
    // const intervalId = setInterval(handleCycle, 3000);
    // return () => clearInterval(intervalId);
  }, [times]);

  return (
    <>
      <div className="relative w-3/4 self-center  border-4 h-[600px]">
        <AnimatePresence>
          <motion.div
            className="absolute w-48 top-80 left-40"
            initial="initial"
            variants={{
              initial: {
                opacity: 0,
                scale: 0.6,
              },
              show: {
                opacity: 1,
                scale: 1,
              },
              hide: {
                opacity: 0,
                scale: 0.6,
              },
            }}
            animate={cycle}
            transition={{
              duration: 0.8,
              ease: "backInOut",
              delay: 0,
            }}
          >
            <Cloud />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            className="absolute w-60 top-48 right-96"
            initial="initial"
            variants={{
              initial: {
                opacity: 0,
                scale: 0.6,
              },
              show: {
                opacity: 1,
                scale: 1,
              },
              hide: {
                opacity: 0,
                scale: 0.6,
              },
            }}
            animate={cycle}
            transition={{
              duration: 0.8,
              ease: "backInOut",
              delay: 0.7,
            }}
          >
            <Cloud />
          </motion.div>
        </AnimatePresence>
        <motion.div
          className="absolute w-80 top-10 right-10"
          initial="initial"
          variants={{
            initial: {
              opacity: 0,
              scale: 0.6,
            },
            show: {
              opacity: 1,
              scale: 1,
            },
            hide: {
              opacity: 0,
              scale: 0.6,
            },
          }}
          animate={cycle}
          transition={{
            duration: 0.8,
            ease: "backInOut",
            delay: 1.4,
          }}
        >
          <Cloud />
        </motion.div>
      </div>
      <div className="flex gap-3">
        <button className="border" onClick={() => setIsCloud("sm")}>
          sm
        </button>
        <button onClick={() => setTimes(7)}>stop</button>
        <button className="border" onClick={handleCycle}>
          md
        </button>
        <p>{times}</p>
        {/* <button className="border" onClick={() => setIsCloud("md")}>
          md
        </button> */}
        <button className="border" onClick={() => setIsCloud("lg")}>
          lg
        </button>
      </div>
    </>
  );
};

export default Clouds;

export const Cloud = () => {
  return (
    <Image src="/cloud.png" alt="cloud" height={500} width={500} className="" />
  );
};
