import { create } from "zustand";

interface subscriptionModalStore {
    isOpen: boolean,
    onOpen: ()=>void,
    onClose: ()=>void
}

const subscriptionModalHook = create<subscriptionModalStore>((set)=>({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))

export default subscriptionModalHook;

