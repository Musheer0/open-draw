"use client"
import React, { useState } from 'react'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { useCanvas } from './canvas-provider';

const CanvasZoom = () => {
  const [zoom, setZoom] = useState(1);
  const { canvas } = useCanvas();

  const zoomStep = 0.1; // 10% zoom step
  const minZoom = 0.1;
  const maxZoom = 3;

    

  const handleZoom = (newZoom: number) => {
    if (!canvas) return;

    // Clamp zoom between min and max
    newZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
    setZoom(newZoom);
    canvas.setZoom(newZoom);

    // Optional: Adjust position so it zooms to center
    const center = canvas.getCenter();
    canvas.zoomToPoint({ x: center.left, y: center.top }, newZoom);
  };

  const handleZoomIn = () => {
    handleZoom(zoom + zoomStep);
  };

  const handleZoomOut = () => {
    handleZoom(zoom - zoomStep);
  };

  return (
    <div className="zoom flex bg-muted-foreground/15 items-center px-2 py-1 rounded-xl gap-0.5">
      <button
        onClick={handleZoomOut}
        className="p-2 hover:bg-muted-foreground/10 cursor-pointer rounded-xl"
      >
        <MinusCircle size={14} />
      </button>
      <p>{Math.round(zoom * 100)}%</p>
      <button
        onClick={handleZoomIn}
        className="p-2 hover:bg-muted-foreground/10 cursor-pointer rounded-xl"
      >
        <PlusCircle size={14} />
      </button>
    </div>
  );
};

export default CanvasZoom;
