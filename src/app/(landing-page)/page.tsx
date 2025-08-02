import React from 'react'
import Hero from './_components/hero'
import ProductScreenShot from './_components/product-screenshot'
import Features from './_components/features'
import Demo from './_components/demo'
import Link from 'next/link'
import { Github } from 'lucide-react'

const page = () => {
  return (
    <div className='w-full  bg-black'>
      <Hero/>
      <ProductScreenShot/>
      <Features/>
      <Demo/>
      <div className="banner py-40 gap-5 w-full flex items-center flex-col justify-center border-t border-b border-zinc-50/10">
        <h2 className='font-bold text-3xl text-center sm:text-4xl md:text-6xl'>
          Make something cool in under 5 minutes
    </h2>
      <Link href={'/dashboard'}>
          <button className="px-6 py-3 cursor-pointer bg-white text-black rounded-full font-semibold hover:bg-opacity-80 transition">
            Try Open Draw
          </button>
          </Link>
      </div>
       <footer className="border-t border-white/10 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400">© 2025 OpenDraw</div>
            <div className="text-gray-400">Built by Musheer</div>
            <div className="flex space-x-6">
              <Link href="https://github.com/Musheer0/open-draw" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default page