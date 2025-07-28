"use client"
import UploadImageButton from '@/components/images/upload-button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useCanvas } from '../canvas-provider'
import { FabricImage } from 'fabric'
import { SearchUnsplashImage } from './unsplash/search-image'
import { Folder, UploadCloudIcon } from 'lucide-react'
import { useAssetManager } from '@/components/images/assets-manager-provider'
import { Button } from '@/components/ui/button'

const AddImageDropDown = () => {
    const [query ,setQuery] = useState('');
    const [showHint ,setShowHint] = useState(false);
    const [results ,setResults] = useState<string[]>([]);
    const [isLoading ,setIsLoading] = useState(false);
    const {canvas} = useCanvas();
    const {isAssetManagerOpen,setAssetManagerOpen}= useAssetManager()
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
            scaleX:canvasImage.width<=100 ? 1:0.5,
            scaleY:canvasImage.width<=100 ? 1:0.5,
            left:10,
            top:10,
            
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
           <UploadImageButton
           onUploadComplete={(e)=>{
            AddImage(e.url)
           }}
           className="border bg-background shadow-xs py-2 hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
           >
            <UploadCloudIcon size={14}/> Upload Image
           </UploadImageButton>
           <Button 
           onClick={()=>{
            setAssetManagerOpen(!isAssetManagerOpen)
           }}
           variant={'outline'}>
            <Folder/> Browse your assets
           </Button>
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