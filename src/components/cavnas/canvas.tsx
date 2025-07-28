"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Canvas as FCanvas} from 'fabric'
import { useSearchParams } from 'next/navigation';
import { useCanvas } from './canvas-provider';
import { DuplicateObject } from './utils';
const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [canvas ,setCanvas] = useState<FCanvas|null>(null);
    const searchParams = useSearchParams();
    const {setCanvas:setCanvasContext,canvas:canvasContext} = useCanvas();
  
    useEffect(()=>{
        if(!canvas && canvasRef.current){
            const w = Number(searchParams.get('w'))||  500
            const h = Number(searchParams.get('h'))|| 500
            // const scale = window.devicePixelRatio|1
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
    //DUPLICATE FUNCTION
    useEffect(()=>{
      window.addEventListener("keydown",Duplicate);
      return()=>{
        window.removeEventListener("keydown",Duplicate)
      }
    });
    
    //DELECT FUNCTION
     const Delete =async (e:KeyboardEvent)=>{
        if(!canvas) return 
      if(e.key==='Delete'){
        e.preventDefault();
          const active = canvas.getActiveObjects();
          if(active.length!==0){
             active.forEach((a)=>{
                canvas.remove(a);
                canvas.discardActiveObject()
          canvas.renderAll()
             })
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
  const MoveFunction = (e: KeyboardEvent) => {
    if(!canvas) return;
    const activeObj = canvas.getActiveObject();
    if(!activeObj) return;
    const top = activeObj.get('top')
    const left = activeObj.get('left');
    if((e.ctrlKey || e.metaKey )&& e.key=='l'){
      e.preventDefault()
      const locked = activeObj.evented;
      activeObj.set({
        selectable:!locked,
    evented: !locked
      })
    }
        if(!activeObj.evented) return

  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault()
      activeObj.set({
        top:Number(top)-1
      });
      canvas.renderAll();
      canvas.requestRenderAll();
      break;
    case 'ArrowDown':
    e.preventDefault()
      activeObj.set({
        top:Number(top)+1
      });
      canvas.renderAll();
      canvas.requestRenderAll();
      break;
    case 'ArrowLeft':
   e.preventDefault()
      activeObj.set({
        left:Number(left)-1
      });
      canvas.renderAll();
      canvas.requestRenderAll();
      break;
    case 'ArrowRight':
       e.preventDefault()
      activeObj.set({
        left:Number(left)+1
      });
      canvas.renderAll();
      canvas.requestRenderAll();
      break;
    default:
      break;
  }
}
useEffect(()=>{
  window.addEventListener("keydown",MoveFunction);
  return()=>{
    window.removeEventListener("keydown",MoveFunction)
  }
},[MoveFunction])
    
  return (
    <div className='h-full p-20.5 mt-6.5  thin-scrollbar high-scroll items-cent justify-center  p-2 flex-1 flex   overflow-auto'>
      
        <canvas ref={canvasRef}  className='mx-auto'/>
    </div>
  )
}

export default Canvas