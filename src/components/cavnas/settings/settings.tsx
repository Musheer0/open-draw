"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Github, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Settings = () => {
  return (
    <div
    className='p-2 w-md max-h-[50dvh] flex flex-col gap-4'
    >
        <div className="header w-full gap-2 pb-2 border-b flex items-center justify-between">
            <p>Canvas Settings</p>
            <Link href={''}>
            <Button size={'sm'}>
                <Github/>
                Contribute
            </Button>
            </Link>
        </div>
       <div className="body">
        <p>Canvas Dimensions</p>
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
            <p className='text-sm font-semibold'>Width</p>
            <Input
            type='number'
            />
         </div>
            <div className="flex items-center gap-2">
            <p className='text-sm font-semibold'>Height</p>
            <Input
            type='number'
            />
         </div>
        </div>
        <div className="div flex gap-5 py-5 border-b  items-center justify-between">
            <div className="info flex flex-col">
                <p className='text-lg font-bold'>Transparent Background</p>
                <p className='text-xs text-muted-foreground'>Make background transparent (to get transparent background export in png)</p>
            </div>
            <Switch/>
        </div>
         <div className="div flex gap-5 py-5 border-b  items-center justify-between">
            <div className="info flex flex-col">
                <p className='text-lg font-bold'>Delete Craft</p>
                <p className='text-xs text-muted-foreground'>Waring this will delete all of your work you cannot recover later</p>
            </div>
            <Button size={'icon'} variant={'destructive'}><Trash2Icon/></Button>
        </div>
       </div>
    </div>
  )
}

export default Settings