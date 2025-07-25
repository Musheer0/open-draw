"use client"

import React, { useEffect, useRef, useState } from 'react'
import {Canvas as FCanvas} from 'fabric'
import { useSearchParams } from 'next/navigation';
import { useCanvas } from './canvas-provider';
const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [canvas ,setCanvas] = useState<FCanvas|null>(null);
    const searchParams = useSearchParams();
    const {setCanvas:setCanvasContext,canvas:canvasContext} = useCanvas()
    useEffect(()=>{
        if(!canvas && canvasRef.current){
            const w = Number(searchParams.get('w'))|| 500;
            const h = Number(searchParams.get('h'))||500;
            const scale = window.devicePixelRatio ? 1-(window.devicePixelRatio-1): .75
            const initialize = new FCanvas(canvasRef.current,{
                width:w*scale,
                height:h*scale,
                backgroundColor: '#ffff',
                preserveObjectStacking:true,
            });
            initialize.set({
                 width:w,
                height:h,
            });
            initialize.renderAll();
            setCanvas(initialize);
            setCanvasContext(initialize)
        }

        return(()=>{
        if(canvasContext){
            canvasContext.dispose();
        }
        })      
    },[])
  return (
    <div className='h-full flex-1 flex flex-col items-center justify-center relative overflow-auto'>
        <p className='text-sm text-muted-foreground'>Canvas</p>
        <canvas ref={canvasRef} className='shadow-2xl/1' />
    </div>
  )
}

export default Canvas