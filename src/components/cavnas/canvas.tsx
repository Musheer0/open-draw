/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Canvas as FCanvas} from 'fabric'
import { useCanvas } from './canvas-provider';
import { DuplicateObject } from './utils';
import { useCanvasStore } from '@/stores/canvas-state-store';
const Canvas = ({w,h,data,id}:{w:number,h:number,data:any|null,id?:string}) => {
    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [canvas ,setCanvas] = useState<FCanvas|null>(null);
    const {setId} = useCanvasStore()
    const {setCanvas:setCanvasContext,canvas:CanvasContext} = useCanvas();
 useEffect(()=>{
     const fabricCanvas = new FCanvas(canvasRef.current!, {
    width: w <= 500 ? w : w<=1000 ? w/1.5:w / 2,
    height: w <= 500 ? h : w<=1000 ? h/1.5:h / 2,
    backgroundColor: '#ffff',
    preserveObjectStacking: true,
  });
 setCanvas(fabricCanvas);
  setCanvasContext(fabricCanvas);
        fabricCanvas.renderAll();
  fabricCanvas.requestRenderAll();
  return()=>{
    fabricCanvas.dispose();
  }
 },[])
 const LoadProject =async()=>{

if (!canvasRef.current || !w || !h||!CanvasContext||!canvas ) return; 
  if(id && typeof data==='object'){
    setId(id);
    await canvas.loadFromJSON(data);
      canvas.renderAll();
      canvas.requestRenderAll();
  }  
 }
 useEffect(() => {
  LoadProject()
}, [w, h, data,canvas]);

    const Duplicate =async (e:KeyboardEvent)=>{
      if((e.ctrlKey || e.metaKey)&& e.key=='d'){
        e.preventDefault();
        await DuplicateObject(canvas)
      }
    };
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
const AllListeners = (e:KeyboardEvent)=>{
  Duplicate(e);
  Delete(e);
  MoveFunction(e)
}
useEffect(()=>{
  window.addEventListener("keydown",AllListeners);
  return()=>{
    window.removeEventListener("keydown",AllListeners)
  }
},[MoveFunction])
if(w && h) 
  return (
    <div className='h-full py-20.5 mt-6.5  thin-scrollbar high-scroll items-cent justify-center  p-2 flex-1 flex   overflow-auto'>
        <canvas ref={canvasRef}  className='mx-auto'/>
    </div>
  )
}

export default Canvas