import React from 'react'
import ObjectLayers from './object-layers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const ObjectLayersSideBar = () => {

  return (
    <div className='w-[250px] h-full p-2  flex  flex-col gap-2  overflow-hidden overflow-y-auto bg-background rounded-xl border'>
        <div className="actions">
          <Link href={'/dashboard'}>
          <Button variant={'outline'}>
            Go back to dashboard
          </Button>
          </Link>
        </div>
        <ObjectLayers/>
    </div>
  )
}

export default ObjectLayersSideBar