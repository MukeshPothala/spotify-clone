"use client";
import LikedButton from "@/components/LikedButton";
import MediaItem from "@/components/MediaItem";
import { useGetUserHook } from "@/hooks/useGetUserHook";
import useOnPlayHook from "@/hooks/useOnPlayHook";
import { Song } from "@/types/types-custom";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface likedContentProps {
  songs: Song[];
}

const LikedContent = (props: likedContentProps) => {
  const router = useRouter();
  const onPlay = useOnPlayHook(props.songs);
  const { user, isLoading } = useGetUserHook();
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [router, isLoading, user]);

  if (props.songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full  px-6 text-neutral-400">
        no liked songs yet.
      </div>
    );
  }
  return (
    <div className="w-full p-6 flex flex-col gap-y-2">
      {props.songs.map((song) => (
        <div className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
                <MediaItem data={song} onClick={(id: string) => {
                onPlay(id);
              }}/>
            </div>
            <div>
            <LikedButton id={song.id} />
            </div>
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
