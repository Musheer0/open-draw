"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useCanvas } from '../canvas-provider'
import { FabricImage } from 'fabric'
import { SearchUnsplashImage } from './unsplash/search-image'

const AddImageDropDown = () => {
    const [query ,setQuery] = useState('');
    const [showHint ,setShowHint] = useState(false);
    const [results ,setResults] = useState<string[]>([]);
    const [isLoading ,setIsLoading] = useState(false);
    const {canvas} = useCanvas();
     const handleSubmit = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const images = await SearchUnsplashImage(query);
      setResults(images);
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

    const AddImage = async(url:string)=>{
        if(!canvas) return ;
        const canvasImage = await FabricImage.fromURL(url,{
          crossOrigin:'anonymous'
        });
      // const originalWidth = canvasImage.width!;
        // const scale = canvas.width / originalWidth;
        canvasImage.set({
            scaleX:0.5,
            scaleY:0.5,
            left:0,
            top:0,
            
        });
        canvas.add(canvasImage);
        canvas.renderAll();
    }
  return (
    <div className=' w-[300px]'>
        <div className="header p-1.5">
            <p className='text-muted-foreground text-sm'>Add Image</p>
        </div>
        <div className="body flex flex-col p-2 gap-2">
            <Button disabled={isLoading} variant={'outline'} className='rounded-full cursor-pointer'>Upload Image</Button>
            <div className='relative flex items-center py-2 gap-1'>
                <div className="left flex-1 border-b"></div>
                <p className='text-muted-foreground'>or</p>
                <div className="right flex-1 border-b"></div>
            </div>
            <div className="unsplash">
                <Input
                disabled={isLoading}
                onChange={(e)=>{setQuery(e.target.value)}}
                onKeyDown={async(e)=>{
                    if(e.key==='Enter'){
                    await handleSubmit()
                    }
                }}
                onFocus={()=>setShowHint(true)} onBlur={()=>setShowHint(false)} placeholder='Search Images '/>
                {showHint && <p className='text-xs text-muted-foreground'>press enter to search</p>}
                <div className="results masonry overflow-y-auto thin-scrollbar  gap-2 h-[400px] w-full py-2">
                    {isLoading && <p className='text-sm text-muted-foreground animate-pulse'>Looking for Images...</p>}
                    {results.map((e,i)=>{
                        return(
                            <img key={i} onClick={()=>AddImage(e)} src={e}/>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddImageDropDown