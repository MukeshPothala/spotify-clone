"use client";
import useLoadImageHook from "@/hooks/useLoadImageHook";
import { Song } from "@/types/types-custom";
import Image from "next/image";
import React from "react";
import PlayButton from "./PlayButton";

interface songItemProps {
  song: Song;
  onClick: (id: string) => void;
}

const SongItem = (props: songItemProps) => {
  const image_path = useLoadImageHook(props.song);
  return (
    <div
      onClick={() => props.onClick(props.song.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/10 cursor-pointer hover:bg-neutral-400/20 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          fill
          src={image_path || "/images/song_placeholder.png"}
          alt="cover"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full text-md">
          {props.song.title}
        </p>
        <p className="text-neutral-400 text-sm pb-4 truncate w-full font-light">
          {props.song.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
