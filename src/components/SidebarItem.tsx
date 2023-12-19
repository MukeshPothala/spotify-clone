import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

interface SidebarItemProps {
    label: string,
    href: string,
    active?: boolean,
    Icon: IconType
}

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <Link href={props.href} className={twMerge('flex flex-row items-center gap-x-2 w-full cursor-pointer transition text-neutral-400 text-lg h-auto py-2 hover:text-white',props.active&&'text-emerald-500 font-semibold')}>
        <props.Icon size={24}/>
        <p>{props.label}</p>
    </Link>
  )
}

export default SidebarItem