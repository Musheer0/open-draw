"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Github, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useCanvas } from '../canvas-provider'

const Settings = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const { canvas } = useCanvas();

  useEffect(() => {
    if (!canvas) return;
    setWidth(canvas.getWidth());
    setHeight(canvas.getHeight());
  }, [canvas]);

  const handleWidthChange = (value: number) => {
    if (!canvas) return;
    canvas.setWidth(value);
    const el = canvas.getElement();
    el.width = value;
    setWidth(value);
    canvas.requestRenderAll();
  };

  const handleHeightChange = (value: number) => {
    if (!canvas) return;
    canvas.setHeight(value);
    const el = canvas.getElement();
    el.height = value;
    setHeight(value);
    canvas.requestRenderAll();
  };

  const handleDelete = () => {
    window.location.reload(); 
  };

  return (
    <div className='p-2 w-md max-h-[50dvh] flex flex-col gap-4'>
      <div className="header w-full gap-2 pb-2 border-b flex items-center justify-between">
        <p>Canvas Settings</p>
        <Link href={''}>
          <Button size={'sm'}>
            <Github />
            Contribute
          </Button>
        </Link>
      </div>

      <div className="body">
        <p>Canvas Dimensions</p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <p className='text-sm font-semibold'>Width</p>
            <Input
              type='number'
              value={width}
              onChange={(e) => handleWidthChange(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className='text-sm font-semibold'>Height</p>
            <Input
              type='number'
              value={height}
              onChange={(e) => handleHeightChange(Number(e.target.value))}
            />
          </div>
        </div>

      

        <div className="div flex gap-5 py-5 border-b items-center justify-between">
          <div className="info flex flex-col">
            <p className='text-lg font-bold'>Delete Craft</p>
            <p className='text-xs text-muted-foreground'>⚠️ This will delete all of your work. You cannot recover it later.</p>
          </div>
          <Button size={'icon'} variant={'destructive'} onClick={handleDelete}>
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
