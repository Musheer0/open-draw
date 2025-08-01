import React from 'react'

const ProductScreenShot = () => {
  return (
    <div
    className='bg-black w-full py-2 relative  h-screen'
    >
                    <div className="absolute top-0 left-0 w-full border-t border-zinc-50/10"></div>
                    <div className="absolute bottom-0 left-0 w-full border-t border-zinc-50/10"></div>
                    <div className="absolute top-0 left-[9%] h-full border-r w-1  border-zinc-50/10"></div>
                    <div className="absolute top-0 right-[9%] h-full border-r w-1  border-zinc-50/10"></div>

        <div
        style={{
            backgroundImage:'url("./productss.png")'
        }}
        className='mx-auto relative w-[80%] origin-center bg-center mix-blend-screen opacity-80 bg-primary bg-cover  h-full'>
        </div>
        </div>
  )
}

export default ProductScreenShot