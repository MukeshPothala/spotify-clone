import AuthModalControllerHook from "@/hooks/AuthModalControllerHook";
import { getUserHook } from "@/hooks/getUserHook";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

interface likedButtonProps {
  id: string;
}

const LikedButton = (props: likedButtonProps) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = AuthModalControllerHook();
  const { user } = getUserHook();
  const [liked, setLiked] = useState<boolean>(false);
  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", props.id)
        .single();
      if (!error && data) {
        setLiked(true);
      }
    };
    fetchData();
  }, [props.id, supabaseClient, user?.id]);

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }
    if (liked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", props.id);
      if (error) {
        toast.error(error.message);
      } else {
        setLiked(false);
      }
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({ song_id: props.id, user_id: user.id });
      if (error) {
        toast.error(error.message);
      } else {
        setLiked(true);
        toast.success('Liked 👍');
      }
    }
    router.refresh();
  };

  const Icon = liked ? IoHeart : IoHeartOutline;
  return (
    <button
      onClick={handleLike}
      className="rounded-full p-3 transition hover:bg-neutral-600 items-center justify-center flex hover:opacity-70"
    >
      <Icon size={24} color={liked ? "#22c55e" : "#fff"} />
    </button>
  );
};

export default LikedButton;
