"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useCanvas } from "./canvas-provider";

const ExportCanvas = ({title}:{title:string}) => {
  const { canvas } = useCanvas();
  const [open, setOpen] = useState(false);

  const handleExport = (format: "png" | "jpeg" | "webp") => {
    if (!canvas) return;
    const dataUrl = canvas.toDataURL({
      format,
      quality: 1,
      multiplier: 2.5,
      width:canvas.width,
      height:canvas.height
    });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `open-draw-${title}.${format}`;
    link.click();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="px-4 rounded-xl">Export</Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="w-fit translate-x-1/2 p-2 rounded-2xl flex flex-col ">
        <Button variant="ghost" className="justify-start rounded-2xl" onClick={() => handleExport("png")}>
         Export as PNG
        </Button>
        <Button variant="ghost" className="justify-start rounded-2xl" onClick={() => handleExport("jpeg")}>
         Export as JPEG
        </Button>
        <Button variant="ghost" className="justify-start rounded-2xl" onClick={() => handleExport("webp")}>
         Export as WEBP
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ExportCanvas;
