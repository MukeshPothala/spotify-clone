import { create } from "zustand";

interface subscriptionModalStore {
    isOpen: boolean,
    onOpen: ()=>void,
    onClose: ()=>void
}

const useSubscriptionModalHook = create<subscriptionModalStore>((set)=>({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))

export default useSubscriptionModalHook;

