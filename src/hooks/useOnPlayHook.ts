import { Song } from "@/types/types-custom";
import usePlayerHook from "./usePlayerHook";
import useAuthModalControllerHook from "./useAuthModalControllerHook";
import { useGetUserHook } from "./useGetUserHook";


const useOnPlayHook = (songs: Song[]) => {
  const player = usePlayerHook();
  const authModal = useAuthModalControllerHook();
  const { user } = useGetUserHook();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  }

  return onPlay;
};

export default useOnPlayHook;