"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

import { RiPlayFill } from "react-icons/ri";
import { getUserHook } from "@/hooks/getUserHook";
import AuthModalControllerHook from "@/hooks/AuthModalControllerHook";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem = (props: ListItemProps) => {
  const router = useRouter();
  const {user} = getUserHook();
  const authModal = AuthModalControllerHook();
  const redirectFn = () => {
    if(!user){
      return authModal.onOpen();
    }
    router.push(props.href);
  }
  return (
    <button
      className="relative group flex items-center rounded-lg overflow-hidden gap-x-4 bg-neutral-100/20 hover:bg-neutral-100/20 pr-4"
      onClick={redirectFn}
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image src={props.image} fill className="object-cover" alt="liked" />
      </div>
      <p className="font-medium truncate py-5">{props.name}</p>
      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <RiPlayFill size={24} className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
