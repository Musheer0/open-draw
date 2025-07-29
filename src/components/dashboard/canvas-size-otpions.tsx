import { canvasSizeOptionsArray } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const CavasSizeOtpions = () => {
  return (
    <div className='flex  thin-scrollbar pt-10 overflow-x-auto gap-2'>
    {canvasSizeOptionsArray.map((e,i)=>{
        return(
            <React.Fragment key={i}>
                <Link
                className=' flex flex-col items-center hover:text-primary gap-1 shrink-0 justify-center p-2 pr-6 rounded-2xl'
                href={`/draw?w=${e.width}&h=${e.height}`}
                >
                    <div className='flex items-center justify-center bg-primary/5 text-primary rounded-full p-4'>
                        <e.icon/>
                    </div>
                    <p className='text-sm '>{e.name}</p>
                </Link>
            </React.Fragment>
        )
    })}
    </div>
  )
}

export default CavasSizeOtpions