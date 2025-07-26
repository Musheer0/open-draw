"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useCanvas } from '../canvas-provider'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const History = () => {
  const [undoStack, setUndoStack] = useState<string[]>([])
  const [redoStack, setRedoStack] = useState<string[]>([])
  const { canvas } = useCanvas()
  const isRestoring = useRef(false)
  useEffect(() => {
    if (!canvas) return

    // Initial snapshot
    const init = canvas.toJSON()
    setUndoStack([init])

    const handleChange = () => {
      if(isRestoring.current===true) return;
      const snapshot = canvas.toJSON()
      setUndoStack((prev) => [...prev, snapshot])
      setRedoStack([]) 
    }

    canvas.on('object:added'    , handleChange)
    canvas.on('object:modified', handleChange)
    canvas.on('object:removed', handleChange)

    return () => {
      canvas.off('object:added', handleChange)
      canvas.off('object:modified', handleChange)
      canvas.off('object:removed', handleChange)
    }
  }, [canvas])

  const undo = () => {
    if (!canvas || undoStack.length <= 1) return
    isRestoring.current =true
    const current = undoStack[undoStack.length - 1]
    const prev = undoStack[undoStack.length - 2]
    const undoarray = [...undoStack];
    console.log(redoStack.length, undoarray.length)
    const redoarray = [...redoStack,current]
    
    setUndoStack(undoarray.slice(0, undoStack.length-2))
    setRedoStack(redoarray)
    canvas.loadFromJSON(prev)
    canvas.renderAll();
    canvas.requestRenderAll();
    canvas.calcOffset();
          isRestoring.current =false
  }

  const redo = () => {
    if (!canvas || redoStack.length === 0) return
    const next = redoStack[redoStack.length - 1]
    const redoarray = [...redoStack]
        const undoarray = [...undoStack, next];

    redoStack.pop()
        setRedoStack(redoarray)
    setUndoStack(undoarray)
    
    canvas.loadFromJSON(next)
          canvas.renderAll();
          canvas.requestRenderAll();
          canvas.calcOffset();

  }

  return (
   <div className="history flex gap-2 px-2 ">
                   <button onClick={undo} disabled={undoStack.length<=1} className='p-2 disabled:opacity-50 hover:bg-muted-foreground/10 cursor-pointer rounded-xl'><ArrowLeft size={14}/></button>
               <button   onClick={redo} disabled={redoStack.length===0} className='p-2 disabled:opacity-50 hover:bg-muted-foreground/10 cursor-pointer rounded-xl'><ArrowRight  size={14}/></button>
           </div>
  )
}

export default History
