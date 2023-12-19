import { Song } from "@/types/types-custom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";

const useLoadSongHook = (song: Song) => {
  const supabaseClient = useSupabaseClient();
  if (!song) {
    return "";
  }
  const {data:songData} = supabaseClient.storage.from('songs').getPublicUrl(song.song_path);
  return songData.publicUrl;
};

export default useLoadSongHook;
