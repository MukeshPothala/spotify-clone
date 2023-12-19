import React from 'react'

import * as Dialog from '@radix-ui/react-dialog';
import { RxCross2 } from 'react-icons/rx'

interface ModalProps {
    isOpen: boolean,
    onChange: (open:boolean) => void,
    title: string,
    description: string,
    children: React.ReactNode
}

const Modal = (props: ModalProps) => {
  return (
    <Dialog.Root open={props.isOpen} onOpenChange={props.onChange} defaultOpen={props.isOpen}>
        <Dialog.Portal>
            <Dialog.Overlay className='bg-neutral-950/60 inset-0 backdrop-blur-sm fixed'/>
            <Dialog.Content className='fixed top-[50%] left-[50%] border border-neutral-700 drop-shadow-md max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vh] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] bg-neutral-800 rounded-lg p-6 focus:outline-none '>
                <Dialog.Title className='text-center font-BebasNeue capitalize text-2xl font-bold mb-4'>{props.title}</Dialog.Title>
                <Dialog.Description className='mb-4 text-md font-medium leading-normal text-center font-BebasNeue'>
                    {props.description}
                </Dialog.Description>
                <div className='text-justify'>
                    {props.children}
                </div>
                <Dialog.Close asChild>
                    <button className='text-neutral-400 hover:text-white absolute top-[10px] right-[10px]  inline-flex p-2 rounded-full hover:bg-neutral-400/10 focus:outline-none items-center justify-center appearance-none transition delay-75'>
                        <RxCross2 size={20}/>
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal