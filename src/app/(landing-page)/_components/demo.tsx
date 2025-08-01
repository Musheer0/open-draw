import React from 'react'

const Demo = () => {
  return (
    <section className='w-full  gap-2 py-20 flex flex-col px-20'>
        <h1 className='text-center text-4xl md:text-6xl'>
            See it in action.
        </h1>
        <video src="https://res.cloudinary.com/djfng4bom/video/upload/f_auto:video/New_Project_22_15422C3_r7rwjo" 
        muted autoPlay controls
         className='rounded-2xl max-w-6xl mx-auto mt-10 flex-1 w-full'></video>
    </section>
  )
}

export default Demo