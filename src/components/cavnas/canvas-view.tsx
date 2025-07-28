"use client"
import React from 'react'
import CanvasContextProvider from './canvas-provider'
import Canvas from './canvas'
import CanvasToolBar from './canvas-tool-bar'
// import CanvasOptions from './canvas-options'
import ObjectSettingsSideBar from './object-settings/object-settings-sidebar'
import TextSettings from './object-settings/text-settings'
import ObjectLayersSideBar from './object-layers/object-layers-sidebar'
import { SnapToCenter } from './helpers/snapping-helpers'
import AssetsManegement from '../images/assests-manager'
import {AssetManagerProvider} from '@/components/images/assets-manager-provider'
const CanvasView = ({id}:{id:string}) => {
  return (
    <CanvasContextProvider>
      <AssetManagerProvider>
        <main className='w-full p-2  transparent h-screen overflow-hidden hidden lg:flex'>
          <SnapToCenter/>
          <AssetsManegement/>
        
        <CanvasToolBar/>
        <TextSettings/>
        <ObjectLayersSideBar/>
        <Canvas/>
       <ObjectSettingsSideBar/>
        </main>
      </AssetManagerProvider>
        <div className='w-full h-screen lg:hidden flex flex-col items-center justify-center'>
            <p className='text-lg text-muted-foreground'>Screen size not supported yet</p>
        </div>
    </CanvasContextProvider>
  )
}

export default CanvasView