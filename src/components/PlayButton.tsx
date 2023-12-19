import React from "react";
import { RiPlayFill } from "react-icons/ri";

const PlayButton = () => {
  return (
    <button className="transition opacity-0 rounded-full flex items-center justify-center p-3 bg-green-500 translate translate-y-1/4 group-hover:opacity-100 drop-shadow-md group-hover:translate-y-0 hover:scale-110 ">
      <RiPlayFill size={26} className="text-black" />
    </button>
  );
};

export default PlayButton;
