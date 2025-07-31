/* eslint-disable   @typescript-eslint/no-explicit-any*/
"use client";
import { Canvas } from 'fabric'; 
import React, { useEffect, useRef, useState } from 'react';

type PosterData = {
  w: number;
  h: number;
  craf: any; 
};

const RenderCanvasPoster = ({ data }: { data: PosterData }) => {
  const [poster, setPoster] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { w, h, craf } = data;
  const loadFromJSONAsync = (canvas: Canvas, json: any) => {
    return  canvas.loadFromJSON(json)
  };

  const LoadPoster = async (canvas: Canvas) => {
    if (!canvasRef.current) return;
    setPoster(null); 
    canvas.selection = false;
    if (!craf) return;
    try {
      await loadFromJSONAsync(canvas, craf);
      canvas.renderAll();
      canvas.requestRenderAll()
      const img = canvas.toDataURL();
            setPoster(img)
    } catch {
      return;
    }  
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new Canvas(canvasRef.current, {
      width: w <= 1000 ? w : w / 2,
      height: w <= 1000 ? h : h / 2,
    });
    LoadPoster(canvas);
    return () => {
      canvas.dispose()
    };
  }, [data]); 

    return (
      <div
        className="w-full border border-b-transparent overflow-hidden relative rounded-2xl rounded-b-none bg-cover origin-left h-[80%] bg-primary"
        style={{
          backgroundImage: `url(${poster})`,
        }}
        
      >
              
                <canvas
                suppressContentEditableWarning
                suppressHydrationWarning
                className='absolute top-0 left-0 opacity-0 hidden w-full h-full o pointer-events-auto'
                ref={canvasRef} ></canvas>
      </div>
      
    );
 
};

export default RenderCanvasPoster;
