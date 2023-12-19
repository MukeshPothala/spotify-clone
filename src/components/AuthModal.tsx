"use client";
import React, { useEffect } from "react";
import Modal from "./Modal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModalControllerHook from "@/hooks/useAuthModalControllerHook";

const AuthModal = () => {
  const supaClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModalControllerHook();
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);
  const onChangeFn = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      title="Welcome Back!"
      description="Please sign in to account"
      isOpen={isOpen}
      onChange={onChangeFn}
    >
      <Auth
        theme="dark"
        magicLink
        supabaseClient={supaClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: { colors: { brand: "#404040", brandAccent: "#22c55e" } },
          },
        }}
        providers={[]}
      />
    </Modal>
  );
};

export default AuthModal;
