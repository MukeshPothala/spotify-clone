import useLoadImageHook from "@/hooks/useLoadImageHook";
import usePlayerHook from "@/hooks/usePlayerHook";
import { Song } from "@/types/types-custom";
import Image from "next/image";
import React from "react";

interface mediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem = (props: mediaItemProps) => {
  const image_path = useLoadImageHook(props.data);
  const player = usePlayerHook();
  const handleClick = () => {
    if (props.onClick) {
      return props.onClick(props.data.id);
    }
    return player.setId(props.data.id)
  };
  function truncate(str: string, maxLength: number, ellipsis:string = "..."): string {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength - ellipsis.length) + ellipsis;
  }
  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-2 cursor-pointer hover:bg-neutral-600/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          src={image_path || "/images/song_placeholder.png"}
          alt="cover"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate ">{props.data.title}</p>
        <p className="max-md:block hidden text-neutral-400 font-light text-sm truncate">
          {truncate(props.data.author, 15)}
        </p>
        <p className="hidden md:block text-neutral-400 font-light text-sm truncate">
          {truncate(props.data.author, 30)}
        </p>
      </div>
    </div>
  );
};

export default MediaItem;
