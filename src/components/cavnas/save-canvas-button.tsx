"use client"

import { useMutation } from '@tanstack/react-query';
import { useConvex } from 'convex/react'
import React, { useEffect } from 'react'
import { api,  } from '../../../convex/_generated/api';
import { useCanvasStore } from '@/stores/canvas-state-store';
import { useImageUpload } from '@/hooks/use-image-upload';
import { Button } from '../ui/button';
import { useCanvas } from './canvas-provider';
import { Id } from '../../../convex/_generated/dataModel';
import { toast } from 'sonner';
const SaveCanvas = () => {
    const convex = useConvex();
    const {isSaved ,setIsSaved,id}= useCanvasStore();
    const {canvas} = useCanvas()
    const mutate = useImageUpload()
    const {isPending,mutate:saveCraft} = useMutation({
        mutationFn: async()=>{
            try {
                  if (isSaved || !canvas ||!id) return
      // Convert Fabric canvas to blob
      const htmlCanvas = canvas.getElement() as HTMLCanvasElement;
        const blob: Blob = await new Promise((resolve, reject) => {
            htmlCanvas.toBlob((b) => {
             if (b) resolve(b)
             else reject(new Error("Failed to generate canvas blob"))
             }, "image/png")
            })
            // Convert blob to file for ImageKit
            toast.loading("saving changes.. please dont do anything")
            const file = new File([blob], `${id}.png`, { type: "image/png" })
            const poster = await mutate(file);
            await convex.mutation(api.crafts.updateCraft,{id:id as Id<"craft">,poster,data:canvas.toJSON()});
            canvas.requestRenderAll()
            setIsSaved(true); 
            toast.dismiss();    
            toast.success("saved changes")
            } catch (error) {
                
            }
        }
    });
      useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!isPending && !isSaved) {
          saveCraft();
        }
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [isPending, isSaved, saveCraft]);

  return (
    <Button 
    disabled={isPending||isSaved}
    onClick={()=>saveCraft()}
    >
        {isSaved ? 'Saved':isPending ? 'Saving..':'Save changes'}
    </Button>
  )
}

export default SaveCanvas