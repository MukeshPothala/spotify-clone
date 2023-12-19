import { Song } from "@/types/types-custom";
import React, { useEffect, useState } from "react";
import MediaItem from "./MediaItem";
import LikedButton from "./LikedButton";
import { RiPlayFill } from "react-icons/ri";
import {
  IoPauseSharp,
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoVolumeHigh,
  IoVolumeMute,
} from "react-icons/io5";
import Slider from "./Slider";
import usePlayerHook from "@/hooks/usePlayerHook";
import useSound from "use-sound";

interface playerContentProps {
  song: Song;
  song_url: string;
}

const PlayerContent = (props: playerContentProps) => {
  const player = usePlayerHook();
  const [volume, setVolume] = useState<number>(1);
  const [playing, setPlaying] = useState<boolean>(false);
  const Icon = !playing ? RiPlayFill : IoPauseSharp;
  const VolumeIcon = volume !== 0 ? IoVolumeHigh : IoVolumeMute;
  const [play, { pause, sound }] = useSound(props.song_url, {
    volume: volume,
    onplay: () => setPlaying(true),
    onend: () => {
      setPlaying(false);
      onPlayNext();
    },
    onpause: () => setPlaying(false),
    format: ["mp3"],
  });
  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);
  const handlePlay = () => {
    if (!playing) {
      play();
    } else {
      pause();
    }
  };
  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };
  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIdx = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIdx + 1];
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };
  const onPlayPrev = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIdx = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIdx - 1];
    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(previousSong);
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={props.song} />
          <LikedButton id={props.song.id} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 items-center justify-center flex rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon color={"#000"} size={24} />
        </div>
      </div>
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[720px] gap-x-6">
        <IoPlayBackSharp
          className="text-neutral-400 transition cursor-pointer hover:text-white"
          size={24}
          onClick={onPlayPrev}
        />
        <div
          className="flex items-center bg-white hover:opacity-75 justify-center h-10 w-10 rounded-full p-1 cursor-pointer"
          onClick={handlePlay}
        >
          <Icon className="text-black" size={24} />
        </div>
        <IoPlayForwardSharp
          className="text-neutral-400 transition cursor-pointer hover:text-white"
          size={24}
          onClick={onPlayNext}
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="text-white cursor-pointer"
            size={24}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
