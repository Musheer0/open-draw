/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from "react"
import { useCanvas } from "../canvas-provider"
import { Button } from "@/components/ui/button"
import { LockIcon, LockOpenIcon,  Trash2Icon } from "lucide-react" 
import {  BringToFront, EyeIcon, EyeOffIcon, MoreHorizontalIcon, MoveDownIcon, MoveUpIcon, SendToBack } from "lucide-react"
import { cn } from "@/lib/utils"
    import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const ObjectLayers = () => {
  const { canvas } = useCanvas()
  const [layers, setLayers] = useState<any[]>([])
  const [activeObj, setActiveObj] = useState<any | null>(null);
  const [activeObjMulti,setActiveObjMulti] = useState<any[]>([])
//   useEffect(()=>{
//     const layerswithId = layers.map((l)=>{
//         if(!l?.id) {
//             l.id = crypto.randomUUID();
//         return l
//         }
//         return l
//     });
//     setLayers(layerswithId)
//   },[layers.length])
  useEffect(() => {
    if (!canvas) return

    const updateLayers = () => {
      setLayers([...canvas.getObjects()])
      setActiveObj(canvas.getActiveObject())
      setActiveObjMulti([...canvas.getActiveObjects()]);
    }

    canvas.on("object:added", updateLayers)
    canvas.on("object:removed", updateLayers)
    canvas.on("object:modified", updateLayers)
    canvas.on("after:render", updateLayers)
    canvas.on("selection:created", updateLayers)
    canvas.on("selection:updated", updateLayers)
    canvas.on("selection:cleared", () => setActiveObj(null))

    updateLayers()

    return () => {
      canvas.off("object:added", updateLayers)
      canvas.off("object:removed", updateLayers)
      canvas.off("object:modified", updateLayers)
      canvas.off("after:render", updateLayers)
      canvas.off("selection:created", updateLayers)
      canvas.off("selection:updated", updateLayers)
      canvas.off("selection:cleared", () => setActiveObj(null))
    }
  }, [canvas])

  const handleClick = (obj: any) => {
    canvas?.setActiveObject(obj)
    canvas?.renderAll()
    setActiveObj(obj)
  }
  const ToggleLocked = (obj:any)=>{
    const locked = obj.evented;
    obj.set({
    selectable:!locked,
    evented: !locked
});
  }
  const toggleVisibility = (obj: any) => {
    obj.set("visible", !obj.visible)
    canvas?.renderAll()
  }
  const bringForward =(e:any)=>{
    if(canvas){
        canvas.bringObjectForward(e);
        canvas.discardActiveObject();
        canvas?.fire("object:modified", { target: activeObj });
    }
}
    const MoveToTop =(e:any)=>{
    if(canvas){
        canvas.bringObjectToFront(e);
        canvas?.fire("object:modified", { target: activeObj });
    }
  }
    const MoveToBottom =(e:any)=>{
    if(canvas){
        canvas.sendObjectToBack(e);
        canvas?.fire("object:modified", { target: activeObj });
    }
  }
  const bringBackward = (e:any)=>{
    if(canvas){
        canvas.sendObjectBackwards(e)
      canvas.discardActiveObject();
      canvas?.fire("object:modified", { target: activeObj });
      }
  }

 const layer_actions = [
  {
    name: 'Bring to front',
    hint: 'Moves object to the very top layer (above everything)',
    icon: BringToFront,
    action: MoveToTop,
  },
  {
    name: 'Move up one layer',
    hint: 'Shifts object one layer above the current one',
    icon: MoveUpIcon,
    action: bringForward,
  },
  {
    name: 'Send to back',
    hint: 'Moves object to the very bottom (behind all)',
    icon: SendToBack,
    action: MoveToBottom,
  },
  {
    name: 'Move down one layer',
    hint: 'Shifts object one layer below the current one',
    icon: MoveDownIcon,
    action: bringBackward,
  },
 
]

  if (!canvas) return null

  return (
    <div className="flex flex-col   gap-2">
     <div className="header p-2  sticky bg-background top-0 flex items-center justify-between">
       <p className="">Layers ({layers.length})</p>
   
     </div>
      {[...layers]
        .slice()
        .reverse()
        .map((obj, i) => (
          <div
            key={obj?.myId || obj?.id || i} // use a stable key
            onClick={() => handleClick(obj)}
            className={cn(
              "p-3 border flex relative items-center overflow-hidden justify-between gap-2 rounded-xl hover:bg-muted/20 cursor-pointer transition",
             ( activeObj === obj || activeObjMulti.includes(obj)) && "bg-primary/10 border-primary"
            )}
          >
                  {!obj.evented ? <><div
                  onClick={()=>{
                    ToggleLocked(obj)
                  }}
                  className="absolute top-0 left-0 text-sm gap-2 backdrop-blur-sm rounded-xl w-full h-full bg-red-600/10 text-red-600 flex items-center justify-center">
                  <LockIcon size={14}  />  Click To UnLock
                  
                  </div></>:<></>} 

            <img
              src={obj.toDataURL()}
              className="w-5 h-5 object-cover border rounded bg-white"
              alt="layer"
            />
            <p className="text-sm font-medium text-muted-foreground mr-auto">
              {obj.type}
            </p>
  
<Popover>
  <PopoverTrigger asChild>
    <Button size="icon" variant="ghost">
      <MoreHorizontalIcon />
    </Button>
  </PopoverTrigger>

  <PopoverContent className="flex flex-col p-2 gap-1 min-w-[180px]">
    {/* Visibility Toggle */}
    <Button
      onClick={() => {
        toggleVisibility(obj)
      }}
      size="sm"
      variant="ghost"
      className="justify-start gap-2"
    >
      {obj.visible ? <EyeIcon /> : <EyeOffIcon />} Visibility
    </Button>
    <Button
      onClick={(e) => {
        ToggleLocked(obj)
      }}
      size="sm"
      variant="ghost"
      className="justify-start gap-2"
    >
      {obj.evented ? <><LockOpenIcon /> Lock</>:<> <LockIcon /> UnLock</>} 
    </Button>
  <Button
      onClick={()=>{
        if(canvas){
            canvas.remove(obj);
            canvas.renderAll();
            canvas.discardActiveObject()
            canvas.requestRenderAll()
        }
      }}
      size="sm"
      variant="ghost"
      className="justify-start gap-2 text-destructive hover:text-destructive"
    >
      <Trash2Icon className="w-4 h-4" />
      Delete
    </Button>
    {/* Divider */}
    <div className="border-b my-1" />

    {/* Layer Actions with HoverCard Hints */}
    {layer_actions.map((a, i) => (
      <HoverCard key={i}>
        <HoverCardTrigger asChild>
          <Button
            onClick={() => a.action(obj)}
            size="sm"
            variant="ghost"
            className="justify-start gap-2"
          >
            <a.icon /> {a.name}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="text-xs max-w-xs">
          {a.hint}
        </HoverCardContent>
      </HoverCard>
    ))}
  </PopoverContent>
</Popover>


          </div>
        ))}
    </div>
  )
}

export default ObjectLayers
