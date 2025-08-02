import React from 'react'
import {  Square, ImageIcon, Target,  Zap,  RotateCcw } from "lucide-react"

const Features = () => {
     const features = [
    {
      icon: Square,
      title: "Shape tools",
      description: "drag, resize, rotate",
    },
    {
      icon: ImageIcon,
      title: "Upload & bg remove",
      description: "drop pics, remove bg fast",
    },
    {
      icon: Target,
      title: "Snap, align, tweak",
      description: "precision without the pain",
    },
    {
      icon: Zap,
      title: "Built for speed",
      description: "not menus, just tools",
    },
  ]
  return (
     <section id="features" className="container mx-auto px-4 py-20">
        <h1 className='text-4xl md:text-6xl pt-40 tracking-tight leading-none  text-center py-10'>
            Tools That Don’t Make You Cry
        </h1>
        <div className="flex flex-wrap relative items-center justify-center gap-8">
          {features.map((feature, index) => (
            <div key={index} className="w-[80%] overflow-hidden relative sm:w-[300px] flex flex-col items-center justify-center h-[400px] shrink-0 border border-primary/10 shadow-none">
            <feature.icon size={60} className="mb-20  text-primary" />
                <h3 className="text-2xl relative text-center font-semibold mb-2"> {feature.title}</h3>
                <p className="text-muted-foreground relative text-sm">{feature.description}</p>
                <div className="tail-vertical absolute left-1/2 -translate-x-1/2 
                rounded-[100%] w-[70px]  opacity-70 blur-[54px] h-full bg-primary
                -bottom-1/2"></div>
                <div className="tail-horizonal absolute left-1/2 -translate-x-1/2 
                rounded-[100%] w-full h-1/2 bg-primary
                -bottom-[40%] blur-[50px] opacity-70"></div>
            </div>
          ))}
        </div>
      </section>
  )
}

export default Features