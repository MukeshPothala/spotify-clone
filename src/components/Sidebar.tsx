"use client";
import React, { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import { HiHome } from "react-icons/hi2";
import { BiSearch } from "react-icons/bi";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types/types-custom";
import usePlayerHook from "@/hooks/usePlayerHook";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

function Sidebar(props: SidebarProps) {
  const pathname = usePathname();
  const player = usePlayerHook();
  const routes = useMemo(() => {
    return [
      {
        label: "Home",
        href: "/",
        active: pathname !== "/search",
        Icon: HiHome,
      },
      {
        label: "Search",
        href: "/search",
        active: pathname === "/search",
        Icon: BiSearch,
      },
    ];
  }, [pathname]);

  return (
    <div className={twMerge("flex h-full",player.activeId && "h-[calc(100%-80px)]")}>
      <div className="hidden md:flex flex-col w-[300px] gap-y-2 h-full p-2">
        <Box className="flex flex-col px-5 py-4">
          {routes.map((route, i) => (
            <SidebarItem key={i} {...route} />
          ))}
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={props.songs}/>
        </Box>
      </div>
      <main className="flex-1 h-full py-2 overflow-y-auto">
        {props.children}
      </main>
    </div>
  );
}

export default Sidebar;
