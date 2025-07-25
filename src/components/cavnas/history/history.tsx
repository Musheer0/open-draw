"use client"
import React, { useState } from 'react'

const History = () => {
    const [undoStack,setUndoStack ]= useState([]);
    const [redoStack,setRedoStack ]= useState([]);
    const [activeStack ,setActiveStack] = useState();
    const undo = ()=>{
        if(undo.length>0){
            const prev = activeStack;
            setActiveStack(undoStack[undoStack.length-1]);
            const undoStackCopy = undoStack;
            setUndoStack(undoStackCopy.pop()||[]);
            setRedoStack(redoStack.push(prev))
        }
    }
    const redo = ()=>{
        if(undo.length>0){
            const prev = activeStack;
            setActiveStack(redoStack[redoStack.length-1]);
            const redoStackCopy = redoStack;
            setRedoStack(redoStackCopy.pop()||[]);
            setUndoStack(undoStack.push(prev))
        }
    }
    const HandleChange = (e:any)=>{
                    const prev = activeStack;
                    setActiveStack(e);
                    setUndoStack(undoStack.push(prev));
    }
  return (
    <div>History</div>
  )
}

export default History