"use client"

import React, { useEffect, useRef, useState } from 'react'
import {Canvas as FCanvas, IText} from 'fabric'
import { useSearchParams } from 'next/navigation';
import { useCanvas } from './canvas-provider';
import { DuplicateObject } from './utils';
const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [canvas ,setCanvas] = useState<FCanvas|null>(null);
    const searchParams = useSearchParams();
    const {setCanvas:setCanvasContext,canvas:canvasContext} = useCanvas()
    useEffect(()=>{
        if(!canvas && canvasRef.current){
            const w = Number(searchParams.get('w'))|| 500
            const h = Number(searchParams.get('h'))|| 500
            const scale = window.devicePixelRatio|1
            const initialize = new FCanvas(canvasRef.current,{
                width:w/2,
                height:h/2,
                backgroundColor: '#ffff',
                preserveObjectStacking:true
            });
            // initialize.set(
            //  {
            //   width:w*scale,
            //   height:h*scale,
            //   zoom:1
            //  } 
            // )
            initialize.renderAll();
            setCanvas(initialize);
            setCanvasContext(initialize)
        }

        return(()=>{
        if(canvasContext){
            canvasContext.dispose();
        }
        })      
    },[]);
    const Duplicate =async (e:KeyboardEvent)=>{
      
      if((e.ctrlKey || e.metaKey)&& e.key=='d'){
        e.preventDefault();
        await DuplicateObject(canvas)
      }
    };
    useEffect(()=>{
      window.addEventListener("keydown",Duplicate);
      return()=>{
        window.removeEventListener("keydown",Duplicate)
      }
    });
     const Delete =async (e:KeyboardEvent)=>{
        if(!canvas) return 
      if(e.key==='Delete'){
        e.preventDefault();
          const active = canvas.getActiveObject();
          if(active){
            canvas.remove(active);
          canvas.renderAll()
          
        }
      }
      if(e.key==='Escape'){
 const activeObject = canvas.getActiveObject();
    
    if (activeObject) {
      canvas.discardActiveObject(); 
      canvas.requestRenderAll(); 
    }      }
    };
    useEffect(()=>{
      window.addEventListener("keydown",Delete);
      return()=>{
        window.removeEventListener("keydown",Delete)
      }
    });
    
    
  return (
    <div className='h-full py-10.5 thin-scrollbar items-center justify-center  p-2 flex-1 flex   overflow-auto'>
        <canvas ref={canvasRef}  className=''/>
    </div>
  )
}

export default Canvas