"use client";

import SongItem from "@/components/SongItem";
import useOnPlayHook from "@/hooks/useOnPlayHook";
import { Song } from "@/types/types-custom";
import React from "react";

interface PageContentProps {
  songs: Song[];
}

const PageContent = (props: PageContentProps) => {
  const onplay = useOnPlayHook(props.songs);
  if (props.songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">
        no songs are avaliable right now
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {props.songs.map((song) => (
        <SongItem key={song.id} song={song} onClick={(id:string) => onplay(id)} />
      ))}
    </div>
  );
};

export default PageContent;
