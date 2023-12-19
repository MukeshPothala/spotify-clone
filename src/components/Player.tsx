"use client"
import useGetSongByIdHook from "@/hooks/useGetSongByIdHook";
import useLoadSongHook from "@/hooks/useLoadSongHook";
import usePlayerHook from "@/hooks/usePlayerHook";
import React from "react";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayerHook();
  const { song } = useGetSongByIdHook(player.activeId);
  const song_url = useLoadSongHook(song!);
  if(!song || !song_url || !player.activeId){
    return null;
  }
  return <div className="fixed bottom-0 bg-neutral-800/70 rounded-t-lg w-full py-2 h-[80px] px-4">
    <PlayerContent song={song} song_url={song_url} key={song_url}/>
  </div>;
};

export default Player;
