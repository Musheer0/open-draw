"use client"

import { Button } from "@/components/ui/button"
import { useCanvas } from "../canvas-provider"
import { useEffect, useState } from "react";
import { FabricObject } from "fabric";

export const SnapToCenter= ()=>{
  const {canvas} = useCanvas();
  const [activeObject ,setActiveObject] = useState<FabricObject|undefined>(undefined);
  const snapobject = (key:"h"|"v"|"b")=>{
    if(!activeObject || !canvas) return
    const w = canvas?.width/2;
    const h = canvas.height/2
    const objeX = activeObject.width/2
    const objeY = activeObject.height/2
    const centerX = w-objeX;
    const centerY = h-objeY
    if(key==='b'|| key==='h'){
        activeObject.set({
            left: centerX
        })
    }
    if(key==='b'|| key==='v'){
         activeObject.set({
            top: centerY
        })
    }
    canvas.renderAll();
    canvas.requestRenderAll();
    canvas.setActiveObject(activeObject)
  }
  const handleChange = ()=>{
    if(!canvas) return
        const object =canvas.getActiveObject();
         setActiveObject(object)
    }
  useEffect(()=>{
    if(!canvas) return 
    canvas.on("selection:updated",handleChange);
    canvas.on("selection:cleared",handleChange);
    canvas.on("selection:created",handleChange);
canvas.on("object:added",handleChange);

    return ()=>{
  canvas.off("selection:updated",()=>{
        const object =canvas.getActiveObject();
        setActiveObject(object)
    });
canvas.off("object:added",()=>{
        const object =canvas.getActiveObject();
        setActiveObject(object)
    });
  canvas.off("selection:cleared",handleChange);
    canvas.off("selection:created",handleChange);
    }
  },[canvas])
if(canvas && activeObject)
  return(
    <div className="fixed z-50 bottom-5 flex items-center gap-3  left-1/2 -translate-x-1/2 bg-background opacity-70 border shadow-2xl px-3 py-2 rounded-xl">
       <p>Center Item</p>
        <Button onClick={()=>snapobject('h')}  size={'sm'} variant={'outline'}>
           Horizontally
        </Button>
        <Button onClick={()=>snapobject('v')}  size={'sm'} variant={'outline'}>
           Veritically
        </Button>
        <Button  onClick={()=>snapobject('b')} size={'sm'} variant={'outline'}>
            Both
        </Button>
    </div>
  )
else 
    return null
}