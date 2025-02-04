"use client"
import { motion } from "framer-motion";

export const RightContent = () => {
  return (
    <motion.article 
    initial={{
        x: 200,
        opacity: 0,
        display: "none"
    }}

    animate={{
        x: 1,
        opacity: 1,
        display: "block"
    }}

    transition={{
        duration: 0.3
    }}
    className="bg-primary p-8 md:p-16">
      <h2>hello, World !</h2>
    </motion.article>
  );
};
