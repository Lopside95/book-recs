"use client";

import { Book, CloudInfo } from "@/types/books";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export type CloudProps = {
  text?: string;
  show: boolean;
};

const Clouds = ({ times, setTimes, bookRec }: CloudInfo) => {
  const cycle = useAnimationControls();

  const handleCycle = async () => {
    if (times !== undefined && times < 4) {
      await cycle.start("show");
      await cycle.start("hide");
      setTimes(times + 1);
    }
  };

  useEffect(() => {
    handleCycle();
  }, [times]);

  return (
    <>
      <div className="relative w-[850px] self-center border-4 h-[600px]">
        <Image
          src="/thinking.png"
          width={200}
          height={200}
          className="w-40 absolute bottom-2 left-2"
          alt=""
        />

        <AnimatePresence>
          <motion.div
            animate={cycle}
            className="absolute w-48 top-60 left-20"
            initial="initial"
            transition={{
              duration: 0.4,
              ease: "backInOut",
              delay: 0,
            }}
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
          >
            <CloudPic text={bookRec?.genre} show={times > 0} />
            {/* <p className="absolute top-96 left-48">{bookRec?.genre}</p> */}
          </motion.div>

          <motion.div
            animate={cycle}
            className="absolute w-56 top-48 right-80"
            initial="initial"
            transition={{
              duration: 0.4,
              ease: "backInOut",
              delay: 0.6,
            }}
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
          >
            <CloudPic show={times > 1} text={bookRec?.author} />
          </motion.div>
          <motion.div
            animate={cycle}
            className="absolute w-64 top-14 right-20"
            initial="initial"
            transition={{
              duration: 0.4,
              ease: "backInOut",
              delay: 1.2,
            }}
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
          >
            <CloudPic show={times > 2} text={bookRec?.title} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-3"></div>
    </>
  );
};

export default Clouds;

export const CloudPic = ({ text, show }: CloudProps) => {
  return (
    <div className="relative">
      {show && (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black ">
          {text}
        </p>
      )}
      <Image
        alt="cloud"
        className=""
        height={500}
        src="/cloud.png"
        width={500}
      />
    </div>
  );
};
