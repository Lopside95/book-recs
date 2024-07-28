"use client";

import { BookForm } from "@/pages";
import { Book, CloudInfo } from "@/types/books";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// type Cloud = "sm" | "md" | "lg";

export type CloudProps = {
  text: string;
  show: boolean;
};

// const Clouds = ({ isThinking, setIsThinking, times, setTimes }: BookForm) => {
const Clouds = ({
  isThinking,
  setIsThinking,
  times,
  setTimes,
  bookRec,
}: CloudInfo) => {
  // const [isCloud, setIsCloud] = useState<boolean>(false);

  const cycle = useAnimationControls();

  const handleCycle = async () => {
    if (times !== undefined && times < 4) {
      await cycle.start("show");
      await cycle.start("hide");
      setTimes(times + 1);
    } else {
      setIsThinking(false);
    }

    // else {
    //   setTimes(0);
    // }
  };

  useEffect(() => {
    handleCycle();
  }, [times]);

  // useEffect(() => {
  //   handleCycle();
  //   // const intervalId = setInterval(handleCycle, 3000);
  //   // return () => clearInterval(intervalId);
  // }, [times]);

  return (
    <>
      <div className="relative w-[850px] self-center border-4 h-[500px]">
        <AnimatePresence>
          <motion.div
            animate={cycle}
            className="absolute w-48 top-80 left-20"
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
          {/* </AnimatePresence>
        <AnimatePresence> */}
          <motion.div
            animate={cycle}
            className="absolute w-56 top-48 right-96"
            initial="initial"
            transition={{
              duration: 0.4,
              ease: "backInOut",
              delay: 0.7,
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
          {/* </AnimatePresence>
        <AnimatePresence> */}
          <motion.div
            animate={cycle}
            className="absolute w-64 top-10 right-20"
            initial="initial"
            transition={{
              duration: 0.4,
              ease: "backInOut",
              delay: 1.4,
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

{
  /* <button className="border" onClick={() => setIsCloud("sm")}>
          sm
        </button>
        <button onClick={() => setTimes(6)}>stop</button>
        <button className="border" onClick={handleCycle}>
          md
        </button>
        <p>{times}</p>
        <button className="border" onClick={() => setIsCloud("md")}>
          md
        </button>
        <button className="border" onClick={() => setIsCloud("lg")}>
          lg
        </button> */
}
// "use client";

// import { BookForm } from "@/pages/find";
// import {
//   AnimatePresence,
//   motion,
//   useAnimationControls,
//   useScroll,
// } from "framer-motion";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// type Cloud = "sm" | "md" | "lg";

// const Clouds = ({ isThinking, setIsThinking, times, setTimes }: BookForm) => {
//   const [isCloud, setIsCloud] = useState<Cloud>("sm");

//   const cycle = useAnimationControls();

//   const handleCycle = async () => {
//     if (times !== undefined && times < 4) {
//       await cycle.start("show");
//       await cycle.start("hide");
//       setTimes(times + 1);
//     } else if (times === 4) {
//       setIsThinking(false);
//     }

//     // else {
//     //   setTimes(0);
//     // }
//   };

//   useEffect(() => {
//     handleCycle();
//     // const intervalId = setInterval(handleCycle, 3000);
//     // return () => clearInterval(intervalId);
//   }, [times]);

//   return (
//     <>
//       <div className="relative w-3/4 self-center  border-4 h-[600px]">
//         <AnimatePresence>
//           <motion.div
//             animate={cycle}
//             className="absolute w-48 top-80 left-40"
//             initial="initial"
//             transition={{
//               duration: 0.8,
//               ease: "backInOut",
//               delay: 0,
//             }}
//             variants={{
//               initial: {
//                 opacity: 0,
//                 scale: 0.6,
//               },
//               show: {
//                 opacity: 1,
//                 scale: 1,
//               },
//               hide: {
//                 opacity: 0,
//                 scale: 0.6,
//               },
//             }}
//           >
//             <CloudPic />
//           </motion.div>
//         </AnimatePresence>
//         <AnimatePresence>
//           <motion.div
//             animate={cycle}
//             className="absolute w-60 top-48 right-96"
//             initial="initial"
//             transition={{
//               duration: 0.8,
//               ease: "backInOut",
//               delay: 0.7,
//             }}
//             variants={{
//               initial: {
//                 opacity: 0,
//                 scale: 0.6,
//               },
//               show: {
//                 opacity: 1,
//                 scale: 1,
//               },
//               hide: {
//                 opacity: 0,
//                 scale: 0.6,
//               },
//             }}
//           >
//             <CloudPic />
//           </motion.div>
//         </AnimatePresence>
//         <motion.div
//           animate={cycle}
//           className="absolute w-80 top-10 right-10"
//           initial="initial"
//           transition={{
//             duration: 0.8,
//             ease: "backInOut",
//             delay: 1.4,
//           }}
//           variants={{
//             initial: {
//               opacity: 0,
//               scale: 0.6,
//             },
//             show: {
//               opacity: 1,
//               scale: 1,
//             },
//             hide: {
//               opacity: 0,
//               scale: 0.6,
//             },
//           }}
//         >
//           <CloudPic />
//         </motion.div>
//       </div>
//       <div className="flex gap-3">
//         <button className="border" onClick={() => setIsCloud("sm")}>
//           sm
//         </button>
//         <button onClick={() => setTimes(6)}>stop</button>
//         <button className="border" onClick={handleCycle}>
//           md
//         </button>
//         <p>{times}</p>
//         {/* <button className="border" onClick={() => setIsCloud("md")}>
//           md
//         </button> */}
//         <button className="border" onClick={() => setIsCloud("lg")}>
//           lg
//         </button>
//       </div>
//     </>
//   );
// };

// export default Clouds;

// export const CloudPic = () => {
//   return (
//     <Image alt="cloud" className="" height={500} src="/cloud.png" width={500} />
//   );
// };
