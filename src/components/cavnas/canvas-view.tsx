"use client"
import React from 'react'
import CanvasContextProvider from './canvas-provider'
import Canvas from './canvas'
import CanvasToolBar from './canvas-tool-bar'
// import CanvasOptions from './canvas-options'
import ObjectSettingsSideBar from './object-settings/object-settings-sidebar'
import TextSettings from './object-settings/text-settings'
import ObjectLayersSideBar from './object-layers/object-layers-sidebar'

const CanvasView = () => {
  return (
    <CanvasContextProvider>
        <main className='w-full p-2  transparent h-screen overflow-hidden hidden lg:flex'>
        <CanvasToolBar/>
        <TextSettings/>
        <ObjectLayersSideBar/>
        <Canvas/>
       <ObjectSettingsSideBar/>
        </main>
        <div className='w-full h-screen lg:hidden flex flex-col items-center justify-center'>
            <p className='text-lg text-muted-foreground'>Screen size not supported yet</p>
        </div>
    </CanvasContextProvider>
  )
}

export default CanvasView