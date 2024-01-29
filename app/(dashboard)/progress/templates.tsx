"use client";
import { motion } from "framer-motion";

export default function Template({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: number;
}) {
  // const {value} = props
  const val = value?.toString() 
  
  

  return (
    <motion.div
      className="bar"
      animate={{
        width: `${val}%`,
      }}
      transition={{
        duration: 2,
      }}
    >
      {children}
    </motion.div>
  );
}
