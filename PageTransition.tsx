
import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // Pure Mixed Dissolve (Crossfade)
  // No movement. No scaling. No gaps.
  // Requires the parent in App.tsx to be a Grid so these stack on top of each other.
  const variants = {
    initial: { 
      opacity: 0
    },
    animate: { 
      opacity: 1, 
      transition: {
        duration: 0.6,
        ease: "linear" as const // Linear ensures a smooth, even mix between the two pages.
      }
    },
    exit: { 
      opacity: 0, 
      transition: {
        duration: 0.6,
        ease: "linear" as const
      }
    }
  };

  return (
    <motion.div
      // col-start-1 row-start-1 forces this element to occupy the first grid cell,
      // ensuring it sits ON TOP of the exiting element (which is also in col-1 row-1).
      className="w-full col-start-1 row-start-1"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ willChange: 'opacity' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
