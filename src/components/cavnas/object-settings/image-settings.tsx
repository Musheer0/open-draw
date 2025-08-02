"use client"

import { FabricImage } from 'fabric'
import React, { useState } from 'react'
import { useCanvas } from '../canvas-provider'
import { Button } from '@/components/ui/button'
import { ScissorsIcon, UserIcon } from 'lucide-react'
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import ImageCropper from '../image/image-cropper'

const ImageSettings = ({obj}:{obj:FabricImage}) => {
const {canvas} = useCanvas();
const [isLoading ,setIsLoading] =useState(false);
const  [isOpen ,setIsOpen] =useState(false);
const RemoveBg = async()=>{
    if(!canvas) return
    const old_url = obj.getSrc();
    if(obj.getSrc().includes('tr=e-bgremove')) return
     const propsToCopy = [
  "left", "top", "scaleX", "scaleY", "angle", "flipX", "flipY",
  "opacity", "originX", "originY", "clipPath", "shadow"
];

const copiedProps = Object.fromEntries(
  propsToCopy.map((key) => [key, obj[key as keyof FabricImage]])
);
setIsLoading(true)
    const newImg = await FabricImage.fromURL(old_url+'?tr=e-bgremove',{crossOrigin:'anonymous',});
    newImg.set(copiedProps)
    canvas.remove(obj);
    canvas.add(newImg);
    canvas.setActiveObject(newImg)
    canvas.renderAll();
    canvas.requestRenderAll()
    setIsLoading(false);
    return

}
const CropImage = async()=>{
    if(!canvas) return
    const old_url = obj.getSrc();
    if(obj.getSrc().includes('tr=e-bgremove')) return
     const propsToCopy = [
  "left", "top", "scaleX", "scaleY", "angle", "flipX", "flipY",
  "opacity", "originX", "originY", "clipPath", "shadow"
];

const copiedProps = Object.fromEntries(
  propsToCopy.map((key) => [key, obj[key as keyof FabricImage]])
);
setIsLoading(true)
    const newImg = await FabricImage.fromURL(old_url+'?tr=e-bgremove',{crossOrigin:'anonymous',});
    newImg.set(copiedProps)
    canvas.remove(obj);
    canvas.add(newImg);
    canvas.setActiveObject(newImg)
    canvas.renderAll();
    canvas.requestRenderAll()
    setIsLoading(false);
    return

}
if(obj && canvas)
  return (
    <div className=' border-b flex flex-col gap-2 p-2'>
        <Button onClick={RemoveBg} disabled={obj.getSrc().includes('tr=e-bgremove')||obj.getSrc().includes('unsplash')||isLoading} size={'sm'} variant={'outline'}>
            <UserIcon/>
           {isLoading ?' Removing Background':' Remove Background'}
        </Button>
       <AlertDialog open={isOpen} onOpenChange={(e)=>setIsOpen(e)}>
        <AlertDialogTrigger asChild slot='div'>
           <Button disabled={isLoading} size={'sm'} variant={'outline'}>
            <ScissorsIcon/>
            Crop Image
        </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <ImageCropper url={obj.getSrc()} onSubmit={(e)=>{
              obj.set({
               cropX: e.left ,
  cropY: e.top,
  width: e.width,
  height: e.height,
  
              });
              obj.setCoords();
              canvas.renderAll()
              setIsOpen(false);
              canvas.setActiveObject(obj)
          }}/>
        </AlertDialogContent>
       </AlertDialog>
    </div>
  )
}

export default ImageSettings