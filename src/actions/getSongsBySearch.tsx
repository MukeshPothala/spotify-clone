import { Song } from "@/types/types-custom";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsBySearch = async (searchTerm: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  if (!searchTerm) {
    const allSongs = await getSongs();
    return allSongs;
  }
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .or(`title.ilike.%${searchTerm}%, author.ilike.%${searchTerm}%`)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error.message);
  }
  return (data as any) || [];
};

export default getSongsBySearch;
