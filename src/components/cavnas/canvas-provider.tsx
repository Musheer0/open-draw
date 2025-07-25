"use client"
import React, { createContext, useContext, useState } from 'react'
import {Canvas} from 'fabric'
const canvasContext = createContext<{canvas:Canvas|null, setCanvas:React.Dispatch<React.SetStateAction<Canvas | null>>}|null>(null);
const CanvasContextProvider = ({children}:{children:React.ReactNode}) => {
    const [canvas ,setCanvas] = useState<Canvas|null>(null);
  return (
    <canvasContext.Provider value={{canvas,setCanvas}}>
        {children}
    </canvasContext.Provider>
  )
}

export default CanvasContextProvider

export const useCanvas = ()=>{
    const context = useContext(canvasContext);
    if(!context) throw new Error("Canvas not found");
    return context
}