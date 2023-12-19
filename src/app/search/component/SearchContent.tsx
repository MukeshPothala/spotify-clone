"use client";
import LikedButton from "@/components/LikedButton";
import MediaItem from "@/components/MediaItem";
import onPlayHook from "@/hooks/onPlayHook";
import { Song } from "@/types/types-custom";
import React from "react";

interface searchContentProps {
  songs: Song[];
}

const SearchContent = (props: searchContentProps) => {
  const onPlay = onPlayHook(props.songs);
  if (props.songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No song found.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-x-2 w-full px-6 my-2">
      {props.songs.map((song) => (
        <div className="flex gap-x-4 items-center w-full" key={song.id}>
          <div className="flex-1">
            <MediaItem
              data={song}
              onClick={(id: string) => {
                onPlay(id);
              }}
            />
          </div>
          <LikedButton id={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
