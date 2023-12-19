import React from "react";

import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import getSongs from "@/actions/getSongs";
import PageContent from "./components/PageContent";
import getPopularSongs from "@/actions/getPopularSongs";

export const revalidate = 0;

const Home = async () => {
  const songs = await getSongs();
  const popularSongs = await getPopularSongs();
  return (
    <div className="bg-neutral-800/70 h-full overflow-y-auto rounded-lg">
      <Header>
        <div className="mb-2">
          <h1 className="font-Kalnia font-semibold text-4xl text-white">
            Welcome back 👋
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-2">
          <ListItem
            href="liked"
            name="Liked Songs"
            image="https://preview.redd.it/rnqa7yhv4il71.jpg?width=1080&crop=smart&auto=webp&s=de143a33b07bab0242ab488cbfe9145e152c01b9"
          />
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6 flex flex-col">
      <div className="mb-4">
          <h1 className="font-semibold font-BebasNeue text-2xl text-white">
            Popular songs
          </h1>
          <PageContent songs={popularSongs} />
        </div>
        <div className="mb-4">
          <h1 className="font-semibold font-BebasNeue text-2xl text-white">
            Newest songs
          </h1>
          <PageContent songs={songs} />
        </div>
      </div>
    </div>
  );
};

export default Home;
