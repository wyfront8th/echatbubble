import { motion, MotionProps, usePresence } from "framer-motion";
import React from "react";
const transition = {
  type: "spring",
  stiffness: 500,
  damping: 50,
  default: {
    duration: 0.4,
  },
};
interface BubbleProps {
  id: number;
  children: string;
  dy: number;
}

const Bubble = (props: BubbleProps) => {
  const [isPresent, safeToRemove] = usePresence();

  const animations: MotionProps = {
    layout: true,
    initial: "out",
    style: {
      position: "static",
    },
    animate: "in",
    variants: {
      in: { opacity: 1, translateY: 0 },
      out: { opacity: 1, translateY: `${props.dy}px` },
    },
    exit: { opacity: 0, translateY: 0 },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition,
  };
  return (
    <motion.div key={props.id} className="bubble" {...animations}>
      <div className="bubble-content">{props.children}</div>
    </motion.div>
  );
};
export default Bubble;
