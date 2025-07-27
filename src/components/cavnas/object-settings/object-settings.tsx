/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client"
import React, {  useEffect, useState } from 'react'
import { useCanvas } from '../canvas-provider'
import { ChromePicker } from 'react-color'
import { FabricObject, Rect } from 'fabric'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { LockIcon, LockOpen, Trash2Icon } from 'lucide-react'

const ColorPicker = ({ title, onChange, value }: { title: string, onChange: (e: string) => void, value: string }) => {
  return (
    <div className='flex items-center justify-between py-2 rounded-xl hover:bg-muted-foreground/5 px-2'>
      <p className='text-sm'>{title}</p>
      <Popover>
        <PopoverTrigger>
          <div
            style={{ backgroundColor: value }}
            className='w-10 h-5 rounded-md border cursor-pointer'
          />
        </PopoverTrigger>
        <PopoverContent>
          <ChromePicker color={value} onChange={(e) => onChange(e.hex)} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

const ObjectSettings = ({ activeObject }: { activeObject: any }) => {
  const { canvas } = useCanvas()
  const [fill, setFill] = useState('#fff');
  const [Background ,setBackground] = useState('#0000')
  const [border, setBorder] = useState({ color: '#000000', width: 1 })
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 })
const [opacity, setOpacity] = useState(1)
const [angle, setAngle] = useState(0)
const [scale, setScale] = useState({ x: 1, y: 1 })
const [position, setPosition] = useState({ x: 0, y: 0 })
const [padding, setPadding] = useState(0)
const [dimensionsLocked, setDimensionsLocked] = useState(false)
const [radius ,setRadius] = useState({
    rx: 0,
    ry:  0,
  });
  const [radiusLocked, setRadiusLocked] = useState(true);
  const [ScaleLocked, setScaleLocked] = useState(true);

const UpdateStatus = ()=>{
      if (activeObject instanceof FabricObject) {
      setFill(activeObject.fill as string || '#ffffff')
      setBorder({
        width: Number(activeObject.strokeWidth) || 1,
        color: activeObject.stroke as string || '#000000'
      });
      setOpacity(activeObject.opacity ?? 1);
      setAngle(activeObject.angle || 0)
setScale({
  x: activeObject.scaleX ?? 1,
  y: activeObject.scaleY ?? 1
})
setPosition({
  x: activeObject.left ?? 0,
  y: activeObject.top ?? 0
});
if (activeObject.type === 'i-text') {
  setPadding(activeObject.padding || 0)
}

setBackground(activeObject.backgroundColor)
if (activeObject instanceof Rect ) {
  setRadius({
    rx: activeObject?.rx || 0,
    ry: activeObject?.ry || 0,
  })
  
}

      setDimensions({
        width: Number(activeObject.width) * activeObject.scaleX,
        height: Number(activeObject.height) * activeObject.scaleY
      })
    }
}
useEffect(()=>{
       if(!canvas) return;
        UpdateStatus();
},[activeObject])
  useEffect(() => {
   if(!canvas) return;
   canvas.on('object:added'    ,UpdateStatus)
    canvas.on('object:modified',UpdateStatus)
    canvas.on('object:removed',UpdateStatus)
    canvas.on("object:moving",UpdateStatus)
    canvas.on("object:resizing",UpdateStatus)
    canvas.on("object:scaling",UpdateStatus)
    canvas.on("object:rotating",UpdateStatus)
    canvas.on("object:resizing",UpdateStatus)
    canvas.on('selection:created', UpdateStatus);
  canvas.on('selection:updated',UpdateStatus);
  canvas.on("before:selection:cleared",UpdateStatus )
     return()=>{
    canvas.off('object:added',UpdateStatus)
    canvas.off('object:modified',UpdateStatus)
    canvas.off('object:removed',UpdateStatus)
      canvas.off("object:moving",UpdateStatus)
    canvas.off("object:resizing",UpdateStatus)
    canvas.off("object:scaling",UpdateStatus)
    canvas.off("object:rotating",UpdateStatus)
    canvas.off("object:resizing",UpdateStatus)
        canvas.off('selection:created', UpdateStatus);
  canvas.off('selection:updated',UpdateStatus);
     }
     
  }, [activeObject,canvas])

  const updateCanvas = () => {
    canvas?.renderAll()
    canvas?.requestRenderAll()
  }

  const handleFillColorChange = (color: string) => {
    if (canvas && activeObject instanceof FabricObject) {
      setFill(color)
      activeObject.set({ fill: color })
      updateCanvas()
    }
  }

  const handleBorderColorChange = (color: string) => {
    if (canvas && activeObject instanceof FabricObject) {
      setBorder(prev => ({ ...prev, color }))
      activeObject.set({ stroke: color })
      updateCanvas()
    }
  }

  const handleBorderWidthChange = (width: number) => {
    if (canvas && activeObject instanceof FabricObject) {
      setBorder(prev => ({ ...prev, width }))
      activeObject.set({ strokeWidth: width })
      updateCanvas()
    }
  }

  const handleDimensionChange = (key: 'width' | 'height'|"both", value: number) => {
    if (!activeObject || !(activeObject instanceof FabricObject)) return
    if(key==='both'|| dimensionsLocked){
    setDimensions({width:value,height:value})
    }
    else{
       const newDims = { ...dimensions, [key]: value }
    setDimensions(newDims)
    }
   

    // Fabric scales objects instead of resizing by default
    const original = {
      width: activeObject.width || 1,
      height: activeObject.height || 1
    }

    if(activeObject.type==='i-text'|| activeObject.type==='image'){
        if (key === 'width') {
      activeObject.set({ scaleX: value / original.width })
    } else {
      activeObject.set({ scaleY: value / original.height })
    }

    }
    else{
       if(key==='both' || dimensionsLocked){
              activeObject.set({ width: value,height:value })

       }
        if (key === 'width') {
      activeObject.set({ width: value })
    } else {
      activeObject.set({ height: value })
    }

    }
    updateCanvas()
  }
  const handleOpacityChange = (value: number) => {
  if (canvas && activeObject instanceof FabricObject) {
    setOpacity(value)
    activeObject.set({ opacity: value })
    updateCanvas()
  }
}
const handleAngleChange = (value: number) => {
  if (canvas && activeObject instanceof FabricObject) {
    setAngle(value)
    activeObject.set({ angle: value })
    updateCanvas()
  }
}
const handlePaddingChange = (value: number) => {
  if (activeObject?.type === 'i-text') {
    setPadding(value)
    activeObject.set({ padding: value })
    updateCanvas()
  }
}


const handleScaleChange = (key: 'x' | 'y', value: number) => {
  if (!activeObject || !(activeObject instanceof FabricObject)) return
    if(ScaleLocked){
        activeObject.set({ scaleX: value,scaleY:value })
        setScale({x:value, y:value});
          updateCanvas()
        return;
  }
  const newScale = { ...scale, [key]: value }
  setScale(newScale)
 
  if (key === 'x') {
    activeObject.set({ scaleX: value })
  } else {
    activeObject.set({ scaleY: value })
  }

  updateCanvas()
}
const handlePositionChange = (key: 'x' | 'y', value: number) => {
  if (!activeObject || !(activeObject instanceof FabricObject)) return

  const newPos = { ...position, [key]: value }
  setPosition(newPos)

  if (key === 'x') {
    activeObject.set({ left: value })
  } else {
    activeObject.set({ top: value })
  }

  updateCanvas()
}
const handleRadiusChange = (key: 'rx' | 'ry', value: number) => {
  if (!activeObject || activeObject.type !== 'rect' || !canvas) return;

  let updated = { ...radius, [key]: value };

  if (radiusLocked) {
    // When locked, update both
    updated = { rx: value, ry: value };
  }

  setRadius(updated);
  activeObject.set(updated);
  activeObject.setCoords();
  canvas.requestRenderAll();
};

const handleBackgroundColor = (e:string)=>{
  if(canvas && activeObject){
    setBackground(e);
    activeObject.set({
      backgroundColor: e
    });
    updateCanvas();
  }
}
 const handleScaleDimensionBoth = (value: number[]) => {
    handleDimensionChange("both", Math.round(value[0]))
  }

  if (!canvas) return null

  return (
    <div className='flex flex-col pb-10 thin-scrollbar overflow-y-auto h-full flex-1 w-full gap-4 pt-5'>
      <ColorPicker title='Background Color' value={Background} onChange={handleBackgroundColor} />
      <ColorPicker title='Fill Color' value={fill} onChange={handleFillColorChange} />
      <ColorPicker title='Border Color' value={border.color} onChange={handleBorderColorChange} />
      {/* //BORDER */}
      <div className='flex items-center justify-between px-2'>
        <p className='text-sm'>Border Width</p>
        <Input
          type="number"
          className='w-16'
          value={border.width}
          min={0}
          onChange={(e) => handleBorderWidthChange(Number(e.target.value))}
        />
      </div>
      <div className='px-2'>
        <Slider
          value={[border.width]}
          min={0}
          max={50}
          step={1}
          onValueChange={([val]) => handleBorderWidthChange(val)}
        />
      </div>
      {/* //OPACITY */}
      <div className='flex items-center justify-between px-2'>
  <p className='text-sm'>Opacity</p>
  <Slider
    className='w-40'
    min={0}
    max={1}
    step={0.01}
    value={[opacity]}
    onValueChange={(val) => handleOpacityChange(val[0])}
  />
</div>
{/* //WIDTH HEIGHT */}
      <div className='flex flex-col pb-5 border-b'>
        <div className='flex items-end pb-2 justify-between px-2 gap-4'>
        <div className='flex flex-col gap-1'>
          <label className='text-xs'>Width</label>
          <Input
            type="number"
            className='w-20'
            value={Math.round(dimensions.width)}
            onChange={(e) => handleDimensionChange('width', Number(e.target.value))}
          />
        </div>
          <Button
    size={'icon'}
    variant={'outline'}
      onClick={() => setDimensionsLocked(!dimensionsLocked)}
      className={`p-2 rounded-md border hover:bg-muted-foreground/10 ${
       dimensionsLocked ? 'text-green-500' : 'text-muted-foreground'
      }`}
      title='Lock radii together'
    >
      {dimensionsLocked ? <LockIcon/>: <LockOpen/>}
    </Button>
        <div className='flex flex-col gap-1'>
          <label className='text-xs'>Height</label>
          <Input
            type="number"
            className='w-20'
            value={Math.round(dimensions.height)}
            onChange={(e) => handleDimensionChange('height', Number(e.target.value))}
          />
        </div>
      </div>
      
      {dimensionsLocked &&
              <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-nowrap">Scale Both</label>
        </div>
        <Slider
          className="w-full max-w-sm"
          min={0}
          max={canvas.width+(canvas.height-canvas.width>0 ? canvas.height-canvas.width: 0)}
          step={1}
          defaultValue={[dimensions.width||0]}
          onValueChange={handleScaleDimensionBoth}
        />
      </div>
      }

      </div>
    {/**PADDING */}
    {activeObject?.type === 'i-text' && (
  <div className='flex items-center justify-between border-b pb-5 px-2'>
    <p className='text-sm'>Padding</p>
    <Input
      type='number'
      min={0}
      value={padding}
      className='w-20'
      onChange={(e) => handlePaddingChange(Number(e.target.value))}
    />
  </div>
)}

      {/* //ROTATION */}
      <div className='flex items-center justify-between px-2 border-b pb-5'>
  <p className='text-sm'>Rotate</p>
  <div className='flex gap-2 items-center'>
    <Slider
      className='w-32'
      min={-180}
      max={180}
      step={1}
      value={[angle]}
      onValueChange={(val) => handleAngleChange(val[0])}
    />
    <Input
      type="number"
      className='w-16'
      value={angle}
      onChange={(e) => handleAngleChange(Number(e.target.value))}
    />
  </div>
</div>
      {/* //SCALE*/}
<div className='flex flex-col gap-2 px-2 border-b pb-5'>
  <p className='text-sm font-medium'>Scale</p>
  <div className='flex items-end justify-between gap-4'>
    <div className='flex flex-col'>
      <label className='text-xs'>Scale X</label>
      <Input
        type="number"
        min={0.1}
        step={0.1}
        value={scale.x.toFixed(2)}
        onChange={(e) => handleScaleChange('x', Number(e.target.value))}
        className='w-20'
      />
    </div>
     <Button
    size={'icon'}
    variant={'outline'}
      onClick={() => setScaleLocked(!ScaleLocked)}
      className={`p-2 rounded-md border hover:bg-muted-foreground/10 ${
        ScaleLocked ? 'text-green-500' : 'text-muted-foreground'
      }`}
      title='Lock radii together'
    >
      {ScaleLocked? <LockIcon/>: <LockOpen/>}
    </Button>
    <div className='flex flex-col'>
      <label className='text-xs'>Scale Y</label>
      <Input
        type="number"
        min={0.1}
        step={0.1}
        value={scale.y.toFixed(2)}
        onChange={(e) => handleScaleChange('y', Number(e.target.value))}
        className='w-20'
      />
    </div>
  </div>
  {ScaleLocked &&
   <Slider min={0}  
   max={1000}
  value={[scale.x*100]}
  step={1}
  onValueChange={(e)=>{
     handleScaleChange('x', Number(e[0])/100)
     handleScaleChange('y', Number(e[0])/100)
  }}
  />
  }
</div>
      {/* //POSITION*/}
<div className='flex flex-col gap-2 px-2 border-b pb-5'>
  <p className='text-sm font-medium'>Position</p>
  <div className='flex items-center justify-between gap-4'>
    <div className='flex flex-col'>
      <label className='text-xs'>X (Left)</label>
      <Input
        type="number"
        value={Math.round(position.x)}
        onChange={(e) => handlePositionChange('x', Number(e.target.value))}
        className='w-20'
      />
    </div>
    <div className='flex flex-col'>
      <label className='text-xs'>Y (Top)</label>
      <Input
        type="number"
        value={Math.round(position.y)}
        onChange={(e) => handlePositionChange('y', Number(e.target.value))}
        className='w-20'
      />
    </div>
  </div>
</div>
      {/* //RADIUS*/}

{activeObject?.type === 'rect'  && (
  <>
  <div className='flex items-end justify-between px-2 gap-2'>
    <div className='flex flex-col gap-1'>
      <label className='text-xs'>Radius X</label>
      <Input
        type='number'
        className='w-20'
        value={radius.rx}
        min={0}
        onChange={(e) => handleRadiusChange('rx', Number(e.target.value))}
      />
    </div>
    <Button
    size={'icon'}
    variant={'outline'}
      onClick={() => setRadiusLocked(!radiusLocked)}
      className={`p-2 rounded-md border hover:bg-muted-foreground/10 ${
        radiusLocked ? 'text-green-500' : 'text-muted-foreground'
      }`}
      title='Lock radii together'
    >
      {radiusLocked ? <LockIcon/>: <LockOpen/>}
    </Button>
    <div className='flex flex-col gap-1'>
      <label className='text-xs'>Radius Y</label>
      <Input
        type='number'
        className='w-20'
        value={radius.ry}
        min={0}
        onChange={(e) => handleRadiusChange('ry', Number(e.target.value))}
      />
    </div>
  </div>
 {radiusLocked &&
  <Slider min={0} max={200} 
  value={[radius.rx]}
  step={1}
  onValueChange={(e)=>{
    handleRadiusChange('ry', Number(e[0]));
    handleRadiusChange('rx', Number(e[0]));
  }}
  />
 }
  </>
)}
       
      {/* //DELETE */}
        <div className='flex items-center justify-between px-2'>
  <p className='text-sm'>Romove Object</p>
  <div className='flex gap-2 items-center'>
    <Button
    onClick={()=>{
        canvas.remove(activeObject);
        updateCanvas()
    }}
    variant={'destructive'}><Trash2Icon/> Delete</Button>
  </div>
</div>
    </div>
  )
}

export default ObjectSettings
