"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import uploadModalControllerHook from "@/hooks/uploadModalControllerHook";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import toast from "react-hot-toast";
import { getUserHook } from "@/hooks/getUserHook";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import Input from "./Input";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { user } = getUserHook();
  const uploadModalHook = uploadModalControllerHook();
  const supabaseClient = useSupabaseClient();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChangeFn = (open: boolean) => {
    if (!open) {
      reset();
      uploadModalHook.onClose();
    }
  };

  const onSubmitFn: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const imageFile = data.image?.[0];
      const songFile = data.song?.[0];
      if (
        !imageFile ||
        !songFile ||
        !user ||
        data.author === "" ||
        data.title === ""
      ) {
        toast.error("missing field values.");
        return;
      }
      const uuid = uniqid();
      //uploading songs code
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${data.title}-${uuid}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        toast.error("failed to upload song file");
        return;
      }
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${data.title}-${uuid}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        toast.error("failed to upload image file");
        return;
      }
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: data.title,
          author: data.author,
          song_path: songData.path,
          image_path: imageData.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        toast.error(supabaseError.message);
        return;
      }
      router.refresh();
      setIsLoading(false);
      toast.success("successfully uploaded.");
      reset();
      uploadModalHook.onClose();
    } catch (error) {
      toast.error("Something went wrong...");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Upload Song"
      description="Drop your tunes here!"
      isOpen={uploadModalHook.isOpen}
      onChange={onChangeFn}
    >
      <form
        onSubmit={handleSubmit(onSubmitFn)}
        className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            placeholder="test"
            disabled={isLoading}
            type="file"
            accept=".mp3"
            id="song"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            placeholder="test"
            disabled={isLoading}
            type="file"
            accept="image/jpeg,image/png, image/jpg, image/heic"
            id="image"
            {...register("image", { required: true })}
          />
        </div>
        <Button
          className="rounded-md bg-slate-100"
          disabled={isLoading}
          type="submit"
        >
          upload song...
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
