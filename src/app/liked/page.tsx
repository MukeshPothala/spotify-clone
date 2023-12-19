import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import React from "react";
import Image from "next/image";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const page = async () => {
  const songs = await getLikedSongs();
  return (
    <div className="bg-neutral-800/70 h-full w-full rounded-lg overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-10 ">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-48 lg:w-48 ">
              <Image
                fill
                className="object-cover rounded-md"
                src={
                  "https://preview.redd.it/rnqa7yhv4il71.jpg?width=1080&crop=smart&auto=webp&s=de143a33b07bab0242ab488cbfe9145e152c01b9"
                }
                alt="liked"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                <p className="hidden md:block font-semibold text-md text-neutral-400">Playlist</p>
                <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-7xl">Liked Songs</h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs}/>
    </div>
  );
};

export default page;
