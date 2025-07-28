import CanvasView from '@/components/cavnas/canvas-view'
import React, { Suspense } from 'react'

const page = async({params}:{params:Promise<{id:string}>}) => {
  const {id} = await params;
  return (
   <Suspense fallback="Loading">
     <CanvasView id={id}/>
   </Suspense>
  )
}

export default page