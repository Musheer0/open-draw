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

    const {setCanvas:setCanvasContext} = useCanvas();
    const {isSaved} = useCanvasStore()
 useEffect(() => {
  if (!canvasRef.current && !w || !h) return;

  // dispose any existing Fabric canvas attached to this element
  // const existing = (canvasRef.current as any).__fabricInstance as FCanvas | undefined;
  // if (existing) {
  //   existing.dispose();
    
  //   delete (canvasRef.current as any).__fabricInstance;
  // }

  const fabricCanvas = new FCanvas(canvasRef.current!, {
    width: w <= 500 ? w : w<=1000 ? w/1.5:w / 2,
    height: w <= 500 ? h : w<=1000 ? h/1.5:h / 2,
    backgroundColor: '#ffff',
    preserveObjectStacking: true,
  });
  if(id){
    setId(id)
  }
  if (data && isSaved) {
    fabricCanvas.loadFromJSON(data,()=>{
        fabricCanvas.renderAll();
  fabricCanvas.requestRenderAll();
    });
  }


  (canvasRef.current as any).__fabricInstance = fabricCanvas;

  setCanvas(fabricCanvas);
  setCanvasContext(fabricCanvas);

  return () => {
    fabricCanvas.dispose();
  };
}, [w, h, data]);

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