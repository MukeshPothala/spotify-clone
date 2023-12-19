import { Song } from "@/types/types-custom";
import playerHook from "./playerHook";
import AuthModalControllerHook from "./AuthModalControllerHook";
import { getUserHook } from "./getUserHook";


const onPlayHook = (songs: Song[]) => {
  const player = playerHook();
  const authModal = AuthModalControllerHook();
  const { user } = getUserHook();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  }

  return onPlay;
};

export default onPlayHook;