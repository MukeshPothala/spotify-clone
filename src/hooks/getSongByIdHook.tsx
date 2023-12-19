"use client"
import { Song } from "@/types/types-custom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const getSongByIdHook = (id?: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    const fetchSong = async () => {
      const { data: song, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        setIsLoading(false);
        toast.error(error.message);
        return;
      }
      setSong(song as Song);
      setIsLoading(false);
    };
    fetchSong();
  }, [id, supabaseClient]);
  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default getSongByIdHook;
