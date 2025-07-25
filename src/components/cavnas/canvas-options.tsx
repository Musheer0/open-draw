"use client"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { SidebarCloseIcon, SidebarOpenIcon } from 'lucide-react'
import { InsertOptions } from '@/canvas-options'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
const CanvasOptions = () => {
    const [open ,setIsOpen] =useState(true);
  return (
   <aside
     onClick={()=>{ setIsOpen(!open)}}
   className={cn(
    'p-4 bg-background rounded-2xl flex flex-col  transition-all duration-500 ease-in-out',
    open ? 'w-[300px]':"w-[70px] flex flex-col"
   )}
   >
     <div className={cn("header border-b transition-all duration-500 ease-in-out ",open ? 'pb-4' :'pb-2')}>
                <div className="logo flex flex-col w-full  gap-2">
                    <div className="top flex w-full items-center justify-between gap-5">
                        <Image
                    src={'/logo.svg'}
                    width={34}
                    height={34}
                    alt='logo'
                    className={cn(
                        'transition-all duration-500 ease-in-out',
                        !open? ' scale-0':'flex scale-100'
                    )}
                    />
                    <Button 
                    size={'icon'}
                    variant={'outline'}
                    className={cn(
                        'cursor-pointer transition-all duration-500 ease-in-out',
                        open ?'translate-x-0':'-translate-x-[150%]'
                    )}
                    onClick={()=>{
                        setIsOpen(!open)
                    }}
                    >
                        {open ?
                        <SidebarCloseIcon/>
                        :
                        <SidebarOpenIcon/>
                    
                        }
                    </Button>
                    </div>
                      <h1 className={
                        cn(
                            'font-black transition-all origin-top-left duration-500 ease-in-out',
                            open ? 'text-3xl scale-100 flex':"text-[1px] scale-0 "
                        )
                      }>Open Draw</h1>
                </div>
    </div>
    <div className={cn(
        "options flex flex-col gap-3 py-3 w-full",
        open ? 'items-start px-1':'items-center justify-center  px-0'
    )}>
        {InsertOptions.map((e)=>{
            return (
                <HoverCard key={e.slug} >
  <HoverCardTrigger 
  onClick={(e)=>{
    e.stopPropagation()
  }}
  className='w-full'>
     <div 
                 className={cn(
                    'flex items-center rounded-2xl transition-all duration-500 ease-in-out gap-3 cursor-pointer  hover:text-primary w-full',
                    open ? 'px-3 py-2 hover:bg-primary/5 ':'py-3'
                 )}>
                    <e.icon size={20} 
                    className={cn(
                        'transition-all duration-500 ease-in-out ',
                        open ? 'translate-x-0':' translate-x-1.5'
                    )}
                    />
                    <p className={cn(
                        'transition-all duration-500 ease-in-out',
                        open? 'text-lg':'text-[0px] w-[0px]'
                    )}>{e.name}</p>
                </div>
  </HoverCardTrigger>
 {!open &&
  <HoverCardContent side='right' className='p-0 px-4 py-2 rounded-xl w-fit'>
    {e.name}
  </HoverCardContent>
 }
</HoverCard>
               
            )
        })}
    </div>
   </aside>
  )
}

export default CanvasOptions