"use client"
import React, { useEffect, useState } from 'react'
import {ChromePicker} from 'react-color'
import { useCanvas } from '../canvas-provider'
import { useCanvasStore } from '@/stores/canvas-state-store'
const BackgroundSettings = () => {
  const {canvas} = useCanvas();
    const [color, setColor] = useState('#ffffff');
        const {setIsSaved} = useCanvasStore()
     useEffect(() => {
    if (canvas) {
      const bg = canvas.backgroundColor;
      if (typeof bg === 'string') {
        setColor(bg);
      }
    }
  }, [canvas]);
    const handleColorChange = (newColor: string) => {
    setColor(newColor);

    if (canvas) {
      setIsSaved(false)
       canvas.set({
                backgroundColor:newColor
             });
             canvas.renderAll()
    }
  };

if(canvas)
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <ChromePicker color={color} onChange={(e)=>handleColorChange(e.hex)} className='w-full bg-transparent' disableAlpha />
    </div>
  )
}

export default BackgroundSettings