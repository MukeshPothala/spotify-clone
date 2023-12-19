import useAuthModalControllerHook from "@/hooks/useAuthModalControllerHook";
import { useGetUserHook } from "@/hooks/useGetUserHook";
import useUploadModalControllerHook from "@/hooks/useUploadModalControllerHook";
import { Song } from "@/types/types-custom";
import React from "react";
import { LuPlus } from "react-icons/lu";

import { MdLibraryMusic } from "react-icons/md";
import MediaItem from "./MediaItem";
import useOnPlayHook from "@/hooks/useOnPlayHook";
import useSubscriptionModalHook from "@/hooks/useSubscriptionModalHook";

interface libraryProps {
  songs: Song[];
}

const Library = (props: libraryProps) => {
    const authModal = useAuthModalControllerHook();
    const uploadModal = useUploadModalControllerHook();
    const {user, subscription} = useGetUserHook();
    const subscriptionModal = useSubscriptionModalHook();
    const uploadSongsFn = () => {
        if(!user) {
          return authModal.onOpen();
        }
        if(!subscription){
          return subscriptionModal.onOpen();
        }
        return uploadModal.onOpen();
    }
    const onPlay = useOnPlayHook(props.songs);
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
