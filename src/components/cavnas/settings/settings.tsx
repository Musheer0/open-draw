"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Github, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useCanvas } from '../canvas-provider'
import { useCanvasStore } from '@/stores/canvas-state-store'
import { Switch } from '@/components/ui/switch'
import KeyboardShortcutsDialog from '../helpers/keyboar-shortcuts'

const Settings = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const {AutoSave,setAutoSave} = useCanvasStore()
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
      <div className='py-3 flex items-center justify-between'>
        <p>Enable AutoSave<span className='text-xs text-muted-foreground'>(unstable)</span></p>
        <Switch
        checked={AutoSave}
        onClick={()=>{
          setAutoSave(!AutoSave)
        }}
        />
      </div>
      <div className='py-3 flex items-center justify-between'>
        <p>KeyBoard ShortCuts</p>
        <KeyboardShortcutsDialog/>
      </div>
    </div>
  );
};

export default Settings;
