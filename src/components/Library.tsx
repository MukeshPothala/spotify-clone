import AuthModalControllerHook from "@/hooks/AuthModalControllerHook";
import { getUserHook } from "@/hooks/getUserHook";
import uploadModalControllerHook from "@/hooks/uploadModalControllerHook";
import { Song } from "@/types/types-custom";
import React from "react";
import { LuPlus } from "react-icons/lu";

import { MdLibraryMusic } from "react-icons/md";
import MediaItem from "./MediaItem";
import onPlayHook from "@/hooks/onPlayHook";
import subscriptionModalHook from "@/hooks/subscriptionModalHook";

interface libraryProps {
  songs: Song[];
}

const Library = (props: libraryProps) => {
    const authModal = AuthModalControllerHook();
    const uploadModal = uploadModalControllerHook();
    const {user, subscription} = getUserHook();
    const subscriptionModal = subscriptionModalHook();
    const uploadSongsFn = () => {
        if(!user) {
          return authModal.onOpen();
        }
        if(!subscription){
          return subscriptionModal.onOpen();
        }
        return uploadModal.onOpen();
    }
    const onPlay = onPlayHook(props.songs);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between w-full px-5 py-4">
        <div className="flex items-center gap-x-2 text-neutral-400">
          <MdLibraryMusic size={24} />
          <p className="text-lg">Library</p>
        </div>
        <LuPlus
          size={24}
          onClick ={uploadSongsFn}
          className="text-neutral-400 hover:text-white transition cursor-pointer"
        />
      </div>
      <div className="px-4 mt-2">
        {props.songs.map((song)=><MediaItem key={song.id} data={song} onClick={(id: string)=> {onPlay(id)}}/>)}
      </div>
    </div>
  );
};

export default Library;
