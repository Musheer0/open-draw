/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import { useCanvas } from '../canvas-provider'
import { cn } from '@/lib/utils'
import ObjectSettings from './object-settings'

const ObjectSettingsSideBar = () => {
    const {canvas} = useCanvas()
    const [activeObject, setActiveObject] = useState<any|null>(null)
     const handleSelection = () => {
        if(canvas)
    setActiveObject(canvas.getActiveObject());
  };
    useEffect(()=>{
    if(!canvas) return
    canvas.on('selection:created', handleSelection);
  canvas.on('selection:updated', handleSelection);
  canvas.on('selection:cleared', () => setActiveObject(null)); // user deselected



  return () => {
    canvas.off('selection:created', handleSelection);
    canvas.off('selection:updated', handleSelection);
    canvas.off('selection:cleared');
  };
    },[canvas])
if(canvas )
    return (
    <div className={cn(
        ' h-full bg-background  relative rounded-2xl z-50 transition-all duration-500 ease-in-out ',
        activeObject ? 'w-[300px] ': "pointer-events-none w-[300px]"
    )}>
       {!activeObject && <p className='text-sm text-muted-foreground absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>No Active Selection</p>}
        <div
        className={cn(
        ' h-full w-full transition-all thin-scrollbar overflow-y-auto  duration-500 ease-in-out p-2 overflow-hidden',
        activeObject ? 'opacity-100':"opacity-0"
    )}
        >
        <p className='text-xs text-muted-foreground capitalize px-2 pt-3'>Object:{activeObject?.type}</p>
        <ObjectSettings activeObject={activeObject}/>
        </div>
    </div>
  )
  else 
    return( <></>)

}

export default ObjectSettingsSideBar