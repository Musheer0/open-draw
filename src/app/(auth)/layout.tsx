import { Metadata } from 'next'
import React from 'react'
export const metadata:Metadata ={
    title: 'open-craft|auth',
}
const layout = ({children}:{children:React.ReactNode}) => {

  return (
    <main className='w-full h-screen flex flex-col items-center justify-center'>
        {children}
    </main>
  )
}

export default layout