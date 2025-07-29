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
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'
import { Loader2Icon } from 'lucide-react'

const CanvasView = ({id}:{id:string}) => {
  const data  = useQuery(api.crafts.getCraft,{id:id as Id<"craft">});

if(data===undefined){
  return(
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <Loader2Icon className='animate-spin'/>
    </div>
  )
}
if(!data)
  return(
  <div className='w-full h-screen flex flex-col items-center justify-center'>
    Craft Not found
    </div>
  )
if(data)
  return (
    <CanvasContextProvider>
      <AssetManagerProvider>
        <main className='w-full p-2  transparent h-screen overflow-hidden hidden lg:flex'>
          <SnapToCenter/>
          <AssetsManegement/>
        
        <CanvasToolBar/>
        <TextSettings/>
        <ObjectLayersSideBar/>
        <Canvas w={data.width} h={data.height} data={data.data} id={id}/>
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