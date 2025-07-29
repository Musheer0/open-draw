/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable    @typescript-eslint/ban-ts-comment*/
"use client"
import React, {  useEffect, useState } from 'react'
import { useCanvas } from '../canvas-provider'
import { ChromePicker } from 'react-color'
import { Circle, FabricObject, Rect, Shadow } from 'fabric'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { LockIcon, LockOpen, Trash2Icon } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { AddShadow } from '../utils'
import ImageFilers from './image-filters'
import ImageSettings from './image-settings'
import { ColorPicker as MuiColorPicker } from 'mui-color'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCanvasStore } from '@/stores/canvas-state-store'
export const ColorPicker = ({
  title,
  onChange,
  value,
}: {
  title: string
  onChange: (e: string) => void
  value: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex items-center justify-between py-2 px-2 rounded-xl hover:bg-muted/10 transition-colors">
      <p className="text-sm font-medium">{title}</p>

      <div className="">
        <Popover>
          <PopoverTrigger>
            <div
          className="w-10 h-5 rounded border border-black/30 cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={() => setIsOpen(!isOpen)}
        />
          </PopoverTrigger>
          <PopoverContent className='flex flex-col gap-2'>
            <Input
                          value={value}
            onChange={(e)=>{
              onChange(e.target.value)
            }}
            placeholder='Have color code? past here'/>
               <MuiColorPicker
              value={value}
               disableTextfield
               
              onChange={(color) => {
                //@ts-ignore
    const { alpha, rgb, hex } = color;

    let finalColor = '';

    try {
      if (alpha !== 1) {
      const [r, g, b] = rgb;
      finalColor = `rgba(${r}, ${b}, ${g}, ${alpha})`;
    } else {
      finalColor = `#${hex}`;
    }

    } catch (error) {
            finalColor = `#${hex}`;
    }
    onChange(finalColor);
  }}
            />
          </PopoverContent>
        </Popover>
      </div>
      
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
const [shadowEnabled,setShadowEnable] = useState(false);
    const {setIsSaved} = useCanvasStore()
const [borderRadius ,setBorderRadius] = useState({
    rx: 0,
    ry:  0,
  });
  const [skew ,setSkew] =useState({x:0,y:0})
  const [radius ,setRadius]  =useState(0)
  const [borderRadiusLocked, setBorderRadiusLocked] = useState(true);
  const [ScaleLocked, setScaleLocked] = useState(true);
  const [shadowSettings ,setShadowSettings] = useState({
 color: 'rgba(0,0,0,0.5)', 
  blur: 10,                 
  offsetX: 5,               
  offsetY: 5,             
  })
const UpdateStatus = ()=>{
      if (activeObject instanceof FabricObject) {
        setIsSaved(false)
        setSkew({
          x:activeObject.skewX,
          y:activeObject.skewY
        });
        setShadowEnable(!!activeObject.shadow)
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
if(activeObject instanceof Circle){
  setRadius(activeObject.radius);
activeObject.set({
  originX: 'center',
  originY: 'center'
});
}
setBackground(activeObject.backgroundColor)
if (activeObject instanceof Rect ) {
  setBorderRadius({
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
useEffect(()=>{
  if(canvas && activeObject){
    activeObject.set('shadow', new Shadow(shadowSettings));
    canvas.requestRenderAll()
  }
},[shadowSettings])
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

const handleSkewChange =(dir:"x"|"y",val:number)=>{
    if (!activeObject || !(activeObject instanceof FabricObject)) return
    if(dir==='x') {
      activeObject.set("skewX",val);
    }
    if(dir==='y'){
      activeObject.set("skewY",val)
    }
    setSkew((prev)=>({
      ...prev,
      [dir]:val
    }))
    updateCanvas()
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
const handleBorderRadiusChange = (key: 'rx' | 'ry', value: number) => {
  if (!activeObject || activeObject.type !== 'rect' || !canvas) return;

  let updated = { ...borderRadius, [key]: value };

  if (borderRadiusLocked) {
    // When locked, update both
    updated = { rx: value, ry: value };
  }

  setBorderRadius(updated);
  activeObject.set(updated);
  activeObject.setCoords();
  canvas.requestRenderAll();
};
const handleRadiusChange = (e:number)=>{
  if(canvas && activeObject instanceof Circle){
    activeObject.set({
      radius:e
    });
    updateCanvas()
  }
}
const handleBackgroundColor = (e:string|null)=>{
  if(canvas && activeObject){
    setBackground(e||'transparent');
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
      {activeObject?.type==='image' && <ImageSettings obj={activeObject}/>}
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
      {/* RADIUS CIRCLE */}
{activeObject?.type ==='circle' &&

      <div className='flex flex-col gap-1 pb-4 border-b' >
        <div className='flex items-center gap-2 justify-between'>
        <p className='text-sm font-semibold text-nowrap'>radius :</p>
           <Input
        type="number"
        min={0}
        step={1}
        value={radius}
        onChange={(e) => handleRadiusChange(Number(e.target.value))}
        className=''
      />
        </div>
         <Slider min={0}  
   max={1000}
  value={[radius]}
  step={1}
  onValueChange={(e)=>{
     handleRadiusChange(e[0])
  }}
  />
      </div>
}
{/* //WIDTH HEIGHT */}
     {activeObject?.type!=='circle' &&
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
     }
       <div className='flex flex-col pb-5 border-b'>
        <div className='flex items-end pb-2 justify-between px-2 gap-4'>
        <div className='flex flex-col gap-1'>
          <label className='text-xs'>Skew X</label>
          <Input
            type="number"
            className='w-20'
            value={Math.round(skew.x)}
            onChange={(e) =>handleSkewChange("x",Number(e.target.value))}
          />
        </div>
       
        <div className='flex flex-col gap-1'>
          <label className='text-xs'>Skew Y</label>
          <Input
            type="number"
            className='w-20'
            value={Math.round(skew.y)}
            onChange={(e) => handleSkewChange("y",Number(e.target.value))}
          />
        </div>
      </div>
      
      

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
{activeObject?.type!=='circle' &&
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
}
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
      {/* //BORDER RADIUS*/}
{activeObject?.type === 'rect'  && (
  <>
  <div className='flex items-end justify-between px-2 gap-2'>
    <div className='flex flex-col gap-1'>
      <label className='text-xs'>Radius X</label>
      <Input
        type='number'
        className='w-20'
        value={borderRadius.rx}
        min={0}
        onChange={(e) => handleBorderRadiusChange('rx', Number(e.target.value))}
      />
    </div>
    <Button
    size={'icon'}
    variant={'outline'}
      onClick={() => setBorderRadiusLocked(!borderRadiusLocked)}
      className={`p-2 rounded-md border hover:bg-muted-foreground/10 ${
        borderRadiusLocked ? 'text-green-500' : 'text-muted-foreground'
      }`}
      title='Lock radii together'
    >
      {borderRadiusLocked ? <LockIcon/>: <LockOpen/>}
    </Button>
    <div className='flex flex-col gap-1'>
      <label className='text-xs'>Radius Y</label>
      <Input
        type='number'
        className='w-20'
        value={borderRadius.ry}
        min={0}
        onChange={(e) => handleBorderRadiusChange('ry', Number(e.target.value))}
      />
    </div>
  </div>
 {borderRadiusLocked &&
  <Slider min={0} max={200} 
  value={[borderRadius.rx]}
  step={1}
  onValueChange={(e)=>{
    handleBorderRadiusChange('ry', Number(e[0]));
    handleBorderRadiusChange('rx', Number(e[0]));
  }}
  />
 }
  </>
)}
       {/* SHADOW */}
       <div className="flex items-center py-5 border-t border-b space-x-2">
      <Switch
      checked={shadowEnabled}
      onClick={()=>{
        setShadowEnable(!shadowEnabled)
        AddShadow(canvas,activeObject)
      }}
      />
      <p className='text-sm font-semibold'>Add Shadow</p>
    </div>
    {shadowEnabled &&
      <div className='flex flex-col border-b pb-5'>
              <p className='text-sm font-semibold'>Shadow Settings</p>
              <ColorPicker title='Shadow Color' value={shadowSettings.color} 
              onChange={(e)=>{
                if(!activeObject && !canvas) return
                const new_state ={
                  ...shadowSettings,
                  color:e
                }
                setShadowSettings(new_state);
                
              }}
              />
              <div className='flex flex-col     py-3 gap-1'>
              <p className='text-sm font-semibold'>Blur</p>
              <div className='flex items-center px-1 gap-1'>
                 <Input
                 className='pr-0 w-[3.5rem]'
                  value={shadowSettings.blur}
                          type="number"
 
                  onChange={(e)=>{
                    setShadowSettings({
                      ...shadowSettings,
                      blur:Number(e.target.value)
                    })
                  }}
                  />
                <Slider
                className='flex-1'
                  min={0}
                 max={100}
                 step={1}
                 value={[shadowSettings.blur]}
                 onValueChange={(e)=>{
                   const new_state ={
                  ...shadowSettings,
                  blur:e[0]
                }
                setShadowSettings(new_state);
                 }}
                />
              </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs font-semibold'>Offet X</p>
                  <Input
                  value={shadowSettings.offsetX}
                          type="number"
 
                  onChange={(e)=>{
                    setShadowSettings({
                      ...shadowSettings,
                      offsetX:Number(e.target.value)
                    })
                  }}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs font-semibold'>Offet Y</p>
                  <Input
                  value={shadowSettings.offsetY}
                          type="number"
                  onChange={(e)=>{
                    setShadowSettings({
                      ...shadowSettings,
                      offsetY:Number(e.target.value)
                    })
                  }}
                  />
                </div>
              </div>
      </div>
    
    }
    {activeObject?.type==='image' &&<ImageFilers obj={activeObject}/>}

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
