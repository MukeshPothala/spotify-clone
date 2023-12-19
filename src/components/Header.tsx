"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi2";
import { LuArrowLeft, LuArrowRight, LuPlus } from "react-icons/lu";
import Button from "./Button";
import AuthModalControllerHook from "@/hooks/AuthModalControllerHook";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getUserHook } from "@/hooks/getUserHook";
import { FaUser } from "react-icons/fa6";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import playerHook from "@/hooks/playerHook";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = (props: HeaderProps) => {
  const player = playerHook();
  const router = useRouter();
  const { onOpen } = AuthModalControllerHook();
  const supabaseClient = useSupabaseClient();
  const { user } = getUserHook();
  const navigationArrowFnButtons = [
    {
      Icon: LuArrowLeft,
      function: () => router.back(),
    },
    {
      Icon: LuArrowRight,
      function: () => router.forward(),
    },
  ];
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("logged out");
    }
  };
  return (
    <div
      className={twMerge(
        `
    h-fit 
    bg-gradient-to-b 
    from-emerald-800 
    p-6
    `,
        props.className
      )}
    >
      <div className="flex items-center justify-between w-full mb-2">
        <div className="items-center hidden md:flex gap-x-2">
          {navigationArrowFnButtons.map((fnButton, idx) => (
            <button
              key={idx}
              onClick={fnButton.function}
              className="flex items-center justify-center p-3 bg-slate-950 transition hover:opacity-75 rounded-full"
            >
              <fnButton.Icon size={24} className="text-white" />
            </button>
          ))}
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center p-3 rounded-full text-black bg-white hover:opacity-75 transition"
          >
            <HiHome size={26} />
          </button>
          <button
            onClick={() => router.push("search")}
            className="flex items-center justify-center p-3 rounded-full text-black bg-white hover:opacity-75 transition"
          >
            <BiSearch size={26} />
          </button>
        </div>
        <div className="flex items-center gap-x-2 justify-between">
          {user ? (
            <>
              <div>
                <Button
                  className="font-semibold px-6 py-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
              <div>
                <Button onClick={() => router.push("/account")} className="p-3">
                  <FaUser size={20} className="text-black" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:block">
                <Button
                  className="text-neutral-400 border-neutral-400 border-[2px] bg-transparent font-medium"
                  onClick={onOpen}
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button className="bg-white font-medium px-6" onClick={onOpen}>
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default Header;
