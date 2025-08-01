import React from 'react'
import CanvasSizeOptions from '@/components/dashboard/canvas-size-otpions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { SparkleIcon } from 'lucide-react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ModeToggle } from '@/components/ui/mode-toggle'
import UserDesings from '@/components/dashboard/user-designs'
const page = () => {
  return (
    <div className='flex flex-col p-2 gap-2 dark:bg-zinc-950 bg-zinc-50'>
        <nav className='w-full flex sticky top-0 bg-inherit items-center justify-between py-2 px-4 '>
            <div className="logo flex  items-center gap-2">
                <Image
                alt='logo'
                src={'/logo.svg'}
                width={40}
                height={40}
                />
                <p className='text-lg font-bold'>Open Craft</p>
            </div>
            <div className='flex items-center gap-2'>
                <ModeToggle/>
                <UserButton/>
            </div>
        </nav>
        <div className="hero bg-gradient-to-b from-primary/10 min-h-screen rounded-2xl flex flex-col gap-5 items-center justify-center w-full p-2 h-[60dvh]">
            <h1 className='md:text-5xl  text-3xl  bg-gradient-to-b from-primary to-primary/50 bg-clip-text text-transparent text-center py-2 leading-none'>
                What will you design today?
            </h1>
            {/* <div className="search w-[90%] max-w-xl bg-background flex items-center gap-2 p-2 rounded-full">
                <input type="search" placeholder='Search projects'className='p-2 rounded-full focus:outline-none flex-1' />
                <Button size={'icon'} className='rounded-full'> <SearchIcon/></Button>
            </div> */}
        <CanvasSizeOptions/>
           <p className='text-sm text-muted-foreground'>
            or
           </p>
          <AlertDialog>
            <AlertDialogTrigger>
                <Button className='rounded-full my-5'  size={'lg'}>
                                          Create new design <SparkleIcon/>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-fit rounded-2xl'>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Create New Designs
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        enter you design dimensions
                    </AlertDialogDescription>
                </AlertDialogHeader>
                 <form action="/draw" className='flex flex-col'>
            <div className='flex items-end w-full gap-5'>
                <div className="width">
                    <p className='text-muted-foreground pb-2'>width</p>
                    <Input
                    required
                    min={0}
                    name='w'
                    type='number'
                    />
                </div>
                <div className="height">
                    <p className='text-muted-foreground pb-2'>Height</p>
                    <Input
                    required
                    min={0}
                    name='h'
                    type='number'
                    />
              </div>
            </div>
              <div className="actions ml-auto py-4 flex items-center gap-2">
                  <AlertDialogCancel  type='button'>
                    Cancle
                </AlertDialogCancel>
              <Button>
                         Create new design <SparkleIcon/>
                     </Button>
              </div>
           </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className='w-full  pl-10 py-2'>
            <h2 className='text-2xl pb-5'>Your Designs</h2>
                           <UserDesings/>

        </div>
    </div>
  )
}

export default page