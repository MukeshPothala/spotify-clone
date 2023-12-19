"use client"
import getSongByIdHook from "@/hooks/getSongByIdHook";
import loadSongHook from "@/hooks/loadSongHook";
import playerHook from "@/hooks/playerHook";
import React from "react";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = playerHook();
  const { song } = getSongByIdHook(player.activeId);
  const song_url = loadSongHook(song!);
  if(!song || !song_url || !player.activeId){
    return null;
  }
  return <div className="fixed bottom-0 bg-neutral-800/70 rounded-t-lg w-full py-2 h-[80px] px-4">
    <PlayerContent song={song} song_url={song_url} key={song_url}/>
  </div>;
};

export default Player;
