"use client";

import { CloudInfo } from "@/types/books";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import Cover from "./cover";

export type CloudProps = {
  text?: string;
  show: boolean;
};

const Clouds = ({ times, setTimes, bookRec }: CloudInfo) => {
  const cycle = useAnimationControls();

  const handleCycle = async () => {
    if (times !== undefined && times < 3) {
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
      <div className="lg:relative w-full flex flex-col-reverse  lg:w-[850px] self-center h-full lg:h-[600px]">
        <Image
          alt=""
          className="w-40 pl-5 lg:absolute bottom-2 left-2   "
          height={200}
          src="/thinking.png"
          width={200}
        />

        <AnimatePresence>
          <motion.div
            animate={cycle}
            className="lg:absolute ml-5 w-40 lg:w-48 top-56 lg:top-60 left-20"
            initial="initial"
            transition={{
              duration: 0.2,
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
            <CloudPic
              show={times >= 0}
              text={bookRec?.genre ? bookRec.genre : "Page"}
            />
            {/* <p className="absolute top-96 left-48">{bookRec?.genre}</p> */}
          </motion.div>

          <motion.div
            animate={cycle}
            className="lg:absolute w-52 lg:w-56 ml-14 lg:top-48 right-80"
            initial="initial"
            transition={{
              duration: 0.2,
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
            <CloudPic
              show={times >= 1}
              text={bookRec?.author ? bookRec.author : "Is"}
            />
          </motion.div>
          <motion.div
            animate={cycle}
            className="lg:absolute w-52 lg:w-64 ml-32 top-14 right-20"
            initial="initial"
            transition={{
              duration: 0.2,
              // duration: 0.4,
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
            <CloudPic
              show={times >= 2}
              text={bookRec?.title ? bookRec.title : "Loading"}
            />
          </motion.div>
        </AnimatePresence>
        {times === 3 && (
          <div className="absolute left-6 lg:right-10 top-16 lg:top-20">
            <Cover
              author={bookRec?.author}
              genre={bookRec?.genre}
              rating={bookRec?.rating}
              title={bookRec?.title}
            />
            {/* <RatingBar rating={bookRec?.rating} /> */}
          </div>
        )}
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
