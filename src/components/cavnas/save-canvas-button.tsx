"use client"

import { useMutation } from '@tanstack/react-query';
import { useConvex } from 'convex/react'
import React, { useEffect } from 'react'
import { api,  } from '../../../convex/_generated/api';
import { useCanvasStore } from '@/stores/canvas-state-store';
import { Button } from '../ui/button';
import { useCanvas } from './canvas-provider';
import { Id } from '../../../convex/_generated/dataModel';
import { toast } from 'sonner';
import {debounce} from 'lodash'
import { IText } from 'fabric';
const SaveCanvas = () => {
    const convex = useConvex();
    const {isSaved ,setIsSaved,id,AutoSave}= useCanvasStore();
    const {canvas} = useCanvas();
    const debouncedSave = React.useRef(
  debounce(() => {
    
    saveCraft(); 
  }, 500) 
).current;

    const {isPending,mutate:saveCraft} = useMutation({
        mutationFn: async()=>{
            try {
                  if (isSaved || !canvas ||!id||isPending) return

                  const activeObj = canvas.getActiveObject();
            await convex.mutation(api.crafts.updateCraft,{id:id as Id<"craft">,data:canvas.toJSON()});
            setIsSaved(true); 
            toast.dismiss();    
            toast.success("saved changes",{position:'bottom-center'});
            setTimeout(()=>{
              toast.dismiss()
            },1000)
            if(activeObj){
              canvas.setActiveObject(activeObj)
            
            }
            } catch (error) {
                toast.error("Error saving to canvas")
            }
        }
    });
    
    useEffect(()=>{
      if(!AutoSave) return;
      toast.dismiss()
      const activeObj = canvas?.getActiveObject();

            if(activeObj?.type=='i-text' && activeObj instanceof IText && activeObj?.isEditing){
                      toast.warning("failed saving ,try ctrl+s to save manually")
                      return;
                    }
      debouncedSave()
    },[isSaved])
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
useEffect(() => {
  if (!canvas) return;

  const markUnsaved = () => {
      setIsSaved(false);
  };

  // Listen to all meaningful change events
  canvas.on('object:added', markUnsaved);
  canvas.on('object:removed', markUnsaved);
  canvas.on('object:modified', markUnsaved);
  canvas.on('object:skewing', markUnsaved); // optional: for resize/skew
  canvas.on('path:created', markUnsaved);   // if you're drawing

  return () => {
    canvas.off('object:added', markUnsaved);
    canvas.off('object:removed', markUnsaved);
    canvas.off('object:modified', markUnsaved);
    canvas.off('object:skewing', markUnsaved);
    canvas.off('path:created', markUnsaved);
  };
}, [canvas]);

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