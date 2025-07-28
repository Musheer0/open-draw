"use client";
import React, { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";

type Props = {
  url: string;
  onSubmit: (cropData: { top: number; left: number; width: number; height: number }) => void;
};

const ImageCropper = ({ url, onSubmit }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [cropData, setCropData] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    const { x, y, width, height } = cropper.getData();
    setCropData({ top: y, left: x, width, height });
  };

  const handleSubmit = () => {
    onSubmit(cropData);
  };

  return (
    <div className="p-2 relative flex flex-col gap-2">
      {/* Spinner */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center  backdrop-blur-sm rounded">
          <div className="w-10 h-10 border-4 border-muted-foreground/10 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <Cropper
        src={url}
        initialAspectRatio={16 / 9}
        crop={onCrop}
        ref={cropperRef}
        zoomable={false}
        ready={() => setIsLoading(false)} // 🧠 this triggers when image is fully ready
      />

     <Button 
             onClick={handleSubmit}
       className="mx-auto"
     variant={'outline'}>
        <Scissors/>
        Crop Image
     </Button>
    </div>
  );
};

export default ImageCropper;
