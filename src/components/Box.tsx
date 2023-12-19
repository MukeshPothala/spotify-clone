import React from "react";
import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box = (props: BoxProps) => {
  return <div className={twMerge("bg-neutral-800/70 rounded-lg w-full h-fit", props.className)}>{props.children}</div>;
};

export default Box;
