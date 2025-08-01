"use client"
import {useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useAssetManager } from "./assets-manager-provider";
import { useCanvas } from "../cavnas/canvas-provider";
import { FabricImage } from "fabric";
import { useState } from "react";

const AssetsManegement = () => {
  const { user } = useUser();
  const {canvas} = useCanvas();
  const {isAssetManagerOpen,setAssetManagerOpen} = useAssetManager()
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const images = useQuery(api.images.getImages,{})||[]
 const AddImage = async(url:string)=>{
        if(!canvas) return ;
        const canvasImage = await FabricImage.fromURL(url,{
          crossOrigin:'anonymous'
        });
      // const originalWidth = canvasImage.width!;
        // const scale = canvas.width / originalWidth;
        canvasImage.set({
             scaleX:canvasImage.width<=100 ? 1:canvasImage.width>=canvas.width ? 0.2:0.4,
            scaleY:canvasImage.width<=100 ? 1:canvasImage.width>=canvas.width ? 0.2:0.4,
            left:10,
            top:10,
            
        });
        canvas.add(canvasImage);
        canvas.renderAll();
    }
  const handleClick = (imgId: string) => {
    setSelectedImages((prev) =>
      prev.includes(imgId)
        ? prev.filter((id) => id !== imgId)
        : [...prev, imgId]
    );
  };

  

  const handleImport = () => {
    if(!images)return
    const selected = images.filter((img) => selectedImages.includes(img._id));
    for (const img of selected){
        AddImage(img.url)
    }
                setAssetManagerOpen(false)

  };

  const handleCancel = () => {
    setSelectedImages([]);
  };

  if (!user) return null;
if(isAssetManagerOpen && canvas )
  return (
    <div className="absolute z-50 p-2 flex flex-col gap-2 top-1 h-[70dvh] left-1 max-w-2xl w-full rounded-2xl bg-background border shadow-2xl">
      <div className="header p-2 pb-0 flex items-center justify-between">
        <p className="capitalize font-semibold">
          {user.fullName}&apos;s assets
        </p>
        <Button
        onClick={()=>{
            setAssetManagerOpen(false)
        }}
        size={"icon"} variant={"destructive"}>
          <X />
        </Button>
      </div>

      <div className="assets relative masonry gap-2 overflow-y-auto thin-scrollbar p-2 bg-muted-foreground/10 flex-1 rounded-2xl flex flex-wrap">

        {images.map((img) => (
          <div
            key={img._id}
            className={`flex p-1 border cursor-pointer h-fit hover:bg-muted-foreground/5 w-[150px] flex-col gap-2 rounded-xl ${
              selectedImages.includes(img._id)
                ? "border-primary bg-muted"
                : "border-transparent"
            }`}
            onClick={() => handleClick(img._id)}
            onDoubleClick={()=>{
                  setSelectedImages([]);
                  AddImage(img.url)
                              setAssetManagerOpen(false)

            }}
          >
            <img src={img.url} className="w-fit rounded" alt="Image" />
            <p className="text-sm text-muted-foreground break-words line-clamp-3">
              {img.name|| 'image'}
            </p>
          </div>
        ))}
      
      </div>

      <div className="footer flex items-center justify-between">
        <div className="actions ml-auto flex items-center gap-2">
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={handleImport}
            disabled={selectedImages.length === 0}
          >
            Import ({selectedImages.length}) assets
          </Button>
          <Button size={"sm"} variant={"outline"} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssetsManegement;
