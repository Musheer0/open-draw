/* eslint-disable */
"use client"
import { Switch } from '@/components/ui/switch'
import { Canvas, FabricObject, Gradient } from 'fabric'
import React, { useState } from 'react'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, 
         ArrowUpLeft, ArrowUpRight, ArrowDownLeft, ArrowDownRight } from 'lucide-react';
import { GetGradient } from './gradients'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const GradientEditor = ({obj,canvas}:{obj:FabricObject,canvas:Canvas}) => {
    const [isEnabled,setIsEnable] = useState(typeof obj?.fill !=='string'  );
    const [activeDir,setActiveDir] = useState('right')
    const [type,setType] =useState(obj?.fill !=='string' && obj?.fill instanceof Gradient ? (obj?.fill).type: 'none')
    const handleGradientChang=()=>{
        setIsEnable(!isEnabled);
       obj.set('fill',!isEnabled? GetGradient('linear',obj.getScaledWidth()):'black');
       canvas.requestRenderAll();
       canvas?.fire("object:modified", { target: canvas?.getActiveObject()! });
       setType('linear')
    }
    const directions = [
  [<ArrowUpLeft />, <ArrowUp />, <ArrowUpRight />],
  [<ArrowLeft />, null, <ArrowRight />],
  [<ArrowDownLeft />, <ArrowDown />, <ArrowDownRight />],
];
const dirToCoords = (w: number, h: number) => ({
  'top-left':     { x1: w,   y1: h,   x2: 0,   y2: 0 },
  'top':          { x1: w/2, y1: h,   x2: w/2, y2: 0 },
  'top-right':    { x1: 0,   y1: h,   x2: w,   y2: 0 },

  'left':         { x1: w,   y1: h/2, x2: 0,   y2: h/2 },
  'right':        { x1: 0,   y1: h/2, x2: w,   y2: h/2 },

  'bottom-left':  { x1: w,   y1: 0,   x2: 0,   y2: h },
  'bottom':       { x1: w/2, y1: 0,   x2: w/2, y2: h },
  'bottom-right': { x1: 0,   y1: 0,   x2: w,   y2: h },
});

 const dirMap = [
    ['top-left', 'top', 'top-right'],
    ['left', '', 'right'],
    ['bottom-left', 'bottom', 'bottom-right']
  ];

  return (
    <div className='flex flex-col border-b border-t py-2'>
       <div className="header flex items-center  justify-between gap-2">
         <p className='text-sm font-semibold'>
            Gradient </p>
            <Switch
            checked={isEnabled}
            onClick={handleGradientChang}
            />
       </div>
      {isEnabled && (obj.fill instanceof Gradient) &&
      <>
      <Tabs defaultValue={type} className='w-full pt-5'>
  <TabsList className=''>
    <TabsTrigger value="linear">Linear</TabsTrigger>
    <TabsTrigger value="radial">Radial</TabsTrigger>
  </TabsList>
  <TabsContent value="linear">
    <div className="color-slip w-full h-10"
       style={{
        backgroundImage: 'linear-gradient(black,red)'
       }}
       >
       </div>
       
  </TabsContent>
  <TabsContent value="radial">
       <div className="color-slip w-full h-10"
       style={{
        backgroundImage: 'radial-gradient(black,red)'
       }}
       >
       </div>
  </TabsContent>
</Tabs>
       <div className="color-stops flex flex-col gap-2 py-2">
        <div className="header flex items-center justify-between">
          <p className='text-sm font-bold'>Color Stops</p>
          <Button size={'sm'} variant={'outline'}>Add Stop</Button>
        </div>
        {obj.fill.colorStops.map((e,i)=>{
          return(
            <React.Fragment key={i}>
               <div className='flex gap-4   p-2 items-center'>
        
          <div className="color w-6 h-6 rounded-full"
          style={{
            backgroundColor: e.color
          }}
          ></div>
          <Input
          value={e.offset*100}
          type='number' min={0} max={100} step={1} className='w-[3.5rem] pr-0'/>

        </div>
            </React.Fragment>
          )
        })}
       </div>
       <div className="direction w-full flex items-center py-2 justify-center">
  <div className="grid grid-cols-3 gap-2 w-fit p-2 rounded-2xl border border-zinc-700 bg-zinc-900">
      {directions.flatMap((row, rowIndex) =>
        row.map((Icon, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-primary/10 hover:text-primary",
              activeDir===dirMap[rowIndex][colIndex] && 'bg-primary/10 text-primary'
            )}
            onClick={() => {
              const dir = dirMap[rowIndex][colIndex];
              setActiveDir(dir)
            }}
          >
            {Icon || <div className={cn(
              "w-4 h-4 rounded-full bg-zinc-500" ,
                            activeDir===dirMap[rowIndex][colIndex] && 'bg-primary '

            )}/>} {/* center dot */}
          </button>
        ))
      )}
    </div>
       </div>
      </>
      }
    </div>
  )
}

export default GradientEditor