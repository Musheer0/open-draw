import CanvasView from '@/components/cavnas/canvas-view'
import React, { Suspense } from 'react'

const page = () => {
  return (
   <Suspense fallback="Loading">
     <CanvasView/>
   </Suspense>
  )
}

export default page