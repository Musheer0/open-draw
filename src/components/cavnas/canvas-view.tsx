"use client"
import React from 'react'
import CanvasContextProvider from './canvas-provider'
import Canvas from './canvas'
import CanvasToolBar from './canvas-tool-bar'

const CanvasView = () => {
  return (
    <CanvasContextProvider>
        <main className='w-full bg-primary/10  h-screen overflow-hidden hidden sm:flex'>
        <CanvasToolBar/>
        <aside className='w-[300px] bg-background'></aside>
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