"use client"
import React from 'react'
import CanvasContextProvider from './canvas-provider'
import Canvas from './canvas'
import CanvasToolBar from './canvas-tool-bar'
import CanvasOptions from './canvas-options'

const CanvasView = () => {
  return (
    <CanvasContextProvider>
        <main className='w-full p-2  bg-primary/10 dark:bg-primary/5 h-screen overflow-hidden hidden sm:flex'>
        <CanvasToolBar/>
        <Canvas/>
        <aside className='w-[200px] bg-background'></aside>
        </main>
        <div className='w-full h-screen sm:hidden flex flex-col items-center justify-center'>
            <p className='text-lg text-muted-foreground'>Screen size not supported yet</p>
        </div>
    </CanvasContextProvider>
  )
}

export default CanvasView