import { MyUserContextProvider } from '@/hooks/useGetUserHook'
import React from 'react'

interface UserProviderProps {
    children: React.ReactNode
}

const UserProvider = (props: UserProviderProps) => {
  return (
    <MyUserContextProvider>
        {props.children}
    </MyUserContextProvider>
  )
}

export default UserProvider