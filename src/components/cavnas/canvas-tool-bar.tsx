"use client"
import { InsertOptions, SingleCickInsertOptions } from '@/canvas-options'
import React from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Image from 'next/image'
import ExportCanvas from './export-canvas'
import { useCanvas } from './canvas-provider'
import { AddShape } from './utils'
import { ModeToggle } from '../ui/mode-toggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import History from './history/history'
const CanvasToolBar = () => {
    const {canvas} = useCanvas()
  return (
    <div className='w-fit z-10 rounded-2xl pr-2 border flex items-center gap-2 bg-background/70 fixed top-2 xl:left-1/2  xl:-translate-x-1/2 px-4 p-2'>
        {SingleCickInsertOptions.map((e)=>{
            return(
                <HoverCard key={e.slug} >
                    <HoverCardTrigger
                    onClick={()=>AddShape(canvas,e.slug)}
                    >
                 <div className='p-2 hover:bg-primary/10 cursor-pointer hover:text-primary rounded-xl'>
                    {e.icon ?  <e.icon size={20}/>:
                   <Image src={e.img!} className='dark:invert' alt={e.name}width={20} height={20}/>
                   }
                </div>
                </HoverCardTrigger>
                <HoverCardContent className='w-fit px-2 rounded-xl py-1'>
                {e.name}
                </HoverCardContent>
                </HoverCard>
                
            )
        })}
        {InsertOptions.map((e)=>{
            return(
           <DropdownMenu key={e.slug}> 
                    <DropdownMenuTrigger title={e.name}>
                           <div  className='p-2 hover:bg-primary/10 cursor-pointer hover:text-primary rounded-xl'>
                                      <e.icon size={20}/>
                </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='rounded-2xl'>
                        {e.component()}
                    </DropdownMenuContent >
                 </DropdownMenu>
            )
        })}
        <History/>
        
        <ModeToggle/>
       <ExportCanvas title='test canvas'/>
        </div>
  )
}

export default CanvasToolBar