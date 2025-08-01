import Link from "next/link";

import Image from "next/image"
import React from "react"
import { Button } from "@/components/ui/button";

export default function Hero() {
  // Heights go LOW in the center, HIGH on the sides
  const stepHeights = [150, 270, 390, 510, 600, 510, 390, 270, 150,]
  return (
    <div
    style={{
      backgroundImage: 'url("./hero.png")'
    }}
    className="relative w-full h-[100dvh]  bg-cover overflow-hidden  bg-zinc-50">
      <div className="content z-[999] absolute w-full  top-0 left-0 flex flex-col  justify-center">
        <nav className="w-full pt-5 px-4 flex items-center justify-between max-w-6xl  mx-auto">
        <div className="logo flex items-center gap-2">
          <Image
          src={'/logo.svg'}
          width={35}
          height={35}
          alt="logo"
          />
          <p className=" text-xl font-black">Open Draw</p>
      
        </div>

          <div className="hidden md:flex space-x-6">
  <Link
    href="https://github.com/Musheer0/open-draw"
    className="text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg"
  >
    GitHub
  </Link>
  <Link
    href="https://github.com/Musheer0/open-draw"
    className="text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg"
  >
    Sponsor
  </Link>
  <Link
    href="/tech-stack"
    className="text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg"
  >
    Tech Stack
  </Link>
        </div>
        <div className="actions">
         <Link href={'/dashboard'}>
          <Button className="bg-zinc-50 text-zinc-950 hover:bg-zinc-100 " >Try Now</Button>
          </Link>
        </div>


      </nav>
      {/* Text content */}
      <div className=" inset-0 z-10 pt-40 flex items-start justify-center text-white text-center px-4">
        <div>
          <h1 className="text-[40px] md:text-6xl max-w-3xl tracking-[0px] leading-none font-bold mb-4">
            A tiny design playground in your browser
          </h1>
          <p className="sm:text-lg opacity-70 mb-6 max-w-sm sm:max-w-xl mx-auto">
          Drop shapes, crop pics, mess around all in one fast lil editor
          </p>
          <Link href={'/dashboard'}>
          <button className="px-6 py-3 cursor-pointer bg-white text-black rounded-full font-semibold hover:bg-opacity-80 transition">
            Try Open Draw
          </button>
          </Link>
        </div>
      </div>
      </div>
      <div className="grip absolute top-0 left-0 translate-y-5 flex w-full z-50 flex flex-col">
       
      </div>
      {/* GRID LINES */}
      <div className="absolute top-0 left-0 h-full flex w-full z-20">
        {stepHeights.map((height, index) => (
          <div
            key={index}
            className="flex-1 relative border-r border-zinc-50/10 h-full"
          >
            
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 translate-y-10 flex w-full z-20">
        {stepHeights.map((height, index) => (
          <div
            key={index}
            className="flex-1 relative bg-black"
            style={{
              marginTop: `${height}px`,
              height: `calc(120dvh - ${height}px)`, // fills rest of screen
            }}
          >
            <div className="top-0 absolute left-0 w-[100dvw] border-t border-zinc-50/10"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
