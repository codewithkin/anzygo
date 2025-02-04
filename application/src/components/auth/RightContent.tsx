"use client"
import { motion } from "framer-motion";

export const RightContent = () => {
  return (
    <motion.article
      initial={{
        x: 200,
        opacity: 0,
        display: "none",
      }}
      animate={{
        x: 1,
        opacity: 1,
        display: "block",
      }}

      transition={{
        duration: 0.3,
      }}

      className="bg-primary p-8 md:p-16"
    >
      {/* Circles */}
      <article className="h-full w-full flex justify-center items-center">
        {/* Outer circle (bigger one) */}
        <motion.article
          initial={{
            width: 0,
            height: 0,
            opacity: 0,
            display: "none",
          }}
          
          animate={{
            width: "300px",
            height: "300px",
            opacity: 1,
            display: "flex",
          }}

          transition={{
            delay: 0.3,
            duration: 0.4,
          }}
          className="bg-gradient-to-t from-blue-700 to-sky-300 flex justify-center items-center shadow-lg rounded-full hover:cursor-pointer transition duration-500 hover:shadow-xl"
        >
          {/* Inner circle (smaller one) */}
          <motion.article
            initial={{
              width: 0,
              height: 0,
              opacity: 0,
              display: "none",
            }}
            animate={{
              width: "250px",
              height: "250px",
              opacity: 1,
              display: "block",
            }}
            transition={{
              delay: 0.7,
              duration: 0.5,
            }}
            whileHover={{
              width: "275px",
              height: "275px",
            }}
            className="bg-sky-300 shadow-lg rounded-full hover:cursor-pointer transition duration-500 hover:shadow-xl"
          ></motion.article>
        </motion.article>
      </article>
    </motion.article>
  );
};

