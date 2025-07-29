"use client"

import { useMutation, useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../convex/_generated/api'
import { Button } from '../ui/button'
import { ArrowRight, Loader2, Trash2Icon } from 'lucide-react'
import Link from 'next/link'

const UserDesings = () => {
    const data = useQuery(api.crafts.getAllCrafs);
    const mutate = useMutation(api.crafts.deleteCraft)
if(data===undefined)
    return(
        <div className='flex items-center justify-center'>
            <Loader2 className='animate-spin'/>
        </div>
        )
if(data)
  return (
<div className='flex gap-2 items-center flex-wrap'>
               {
                data.map((data)=>{
                    return (
                        <React.Fragment key={data._id}>
                             <div className='w-[300px] h-[250px] flex flex-col  overflow-hidden rounded-2xl'>
                    <div className='w-full border border-b-transparent  rounded-2xl rounded-b-none bg-cover origin-left  h-[80%] bg-primary '
                    style={{
                        backgroundImage:  `url(${data.poster})`
                    }}
                    ></div>
                    <div className="footer flex  flex-col py-2 gap-2 bg-primary/10  rounded-2xl rounded-t-none border-t-transparent px-2">
                        <p className='text-xs text-muted-foreground'>created at {new Date(data._creationTime).toDateString()} at {new Date(data._creationTime).getHours()}:{new Date(data._creationTime).getMinutes()} </p>
                      <div className="actions flex items-center w-full justify-between">
                         <Link
                       href={`/draw/${data._id}`}
                       >
                        <Button size={'sm'} className='rounded-full shrink-0 w-fit' variant={'outline'}>
                            Continue editing
                            <ArrowRight/>
                        </Button>
                       </Link>
                        <Button
                        onClick={()=>mutate({id:data._id})}
                        size={'icon'} className='rounded-full shrink-0 ' variant={'destructive'}>
                            <Trash2Icon/>
                        </Button>
                      </div>
                    </div>
                </div>
                        </React.Fragment>
                    )
                })
               }
            </div>  )
else
       return(
        <div className='flex text-muted-foreground items-center justify-center'>
            No designs found
        </div>
        )
}

export default UserDesings