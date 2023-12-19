import { Song } from "@/types/types-custom";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { count } from "console";
import { cookies } from "next/headers";

const getPopularSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const { data, error } = await supabase.rpc('getpopularsongsdata')
  if (error) {
    console.log(error.message);
  }
  return (data as any) || [];
};

export default getPopularSongs;
