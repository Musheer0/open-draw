"use client";
import React, { useEffect, useState } from 'react';
import { useCanvas } from '../canvas-provider';
import { FabricImage,filters } from 'fabric';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { filtersMeta } from './filters';
import { Switch } from '@/components/ui/switch';
import { ColorPicker } from './object-settings';
const defaultFilters = {
  Blur: 0,
  Contrast: 0,
  Grayscale: false,
  Invert: false,
  Noise: 0,
  Pixelate: 1,
  Sepia: false,
  RemoveColor: '#ffffff',
  Saturation: 0,
  HueRotation: 0,
};
const keys = Object.keys(defaultFilters)
const ImageFilers = ({obj}:{obj:FabricImage}) => {
  const { canvas } = useCanvas();
  const [activeObject, setActiveObject] = useState<FabricImage | null>(obj);

  const updateCanvas = () => {
    canvas?.renderAll();
    canvas?.requestRenderAll();
      canvas?.fire("object:modified", { target: obj });
  };

  const [objectFilter, setObjFilters] = useState(defaultFilters);
const parseImageFilters = (img: FabricImage) => {
    const imgFilters = img.filters ?? [];
    const mapped = { ...defaultFilters };

    for (const filter of imgFilters) {
      if (!filter) continue;

      if (filter instanceof filters.Blur) {
        mapped.Blur = filter.blur;
      } else if (filter instanceof filters.Contrast) {
        mapped.Contrast = filter.contrast;
      } else if (filter instanceof filters.Grayscale) {
        mapped.Grayscale = true;
      } else if (filter instanceof filters.Invert) {
        mapped.Invert = true;
      } else if (filter instanceof filters.Noise) {
        mapped.Noise = filter.noise;
      } else if (filter instanceof filters.Pixelate) {
        mapped.Pixelate = filter.blocksize;
      } else if (filter instanceof filters.Sepia) {
        mapped.Sepia = true;
      } else if (filter instanceof filters.RemoveColor) {
        mapped.RemoveColor = filter.color;
      } else if (filter instanceof filters.Saturation) {
        mapped.Saturation = filter.saturation;
      } else if (filter instanceof filters.HueRotation) {
        mapped.HueRotation = filter.rotation;
      }
    }

    setObjFilters(mapped);
  };
  useEffect(() => {
    if (!canvas) return;

    const handleSelection = () => {
      const obj = canvas.getActiveObject();
      if (obj instanceof FabricImage) {
        setActiveObject(obj);
        parseImageFilters(obj)
      } else {
        setActiveObject(null); // deselect if not image
      }
    };

    const handleAnyChange = () => {
      // re-check selection validity when canvas changes
      const obj = canvas.getActiveObject();
      if (obj instanceof FabricImage) {
        setActiveObject(obj);
        parseImageFilters(obj);
      } else {
        setActiveObject(null);
      }
    };

   handleSelection()
  }, [obj]);
if(obj)
  return (
    <div className='p-1 border-b pb-2 '>
        <p className='text-sm font-semibold'>Image filters</p>
      {keys.map((e,i)=>{
        const filter = objectFilter[e as keyof typeof objectFilter]
        const isNum =typeof filter==='number' 
        const HandleChange = (k:string,v:number|boolean|string)=>{
          const fun= filtersMeta.find((f)=>f.name==k);
          if(!fun) return;
          fun.fun({activeObject:obj, cb:updateCanvas},v);
          setObjFilters((prev)=>({
            ...prev,
            [k]:v
          }))
        }
        return(
            <React.Fragment  key={i}>
                <div className='flex flex-col py-2 gap-2'>
                  <p className='text-sm font-semibold'>
                    {e} {isNum && `(${filter})`}
                  </p>
                  {isNum &&
                  <div className='flex items-center gap-2'>
                    <Slider
                    onValueChange={(v)=>{
                      HandleChange(e,v[0]);
                    }}
                    max={1} step={0.1} min={0}
                    value={[filter]}
                    />
                  </div>
                  }
                  {typeof filter ==='boolean' &&
                  <>
                  <Switch
                  checked={filter}
                  onClick={()=>{
                    HandleChange(e,!filter)
                  }}
                  />
                  </>
                  }
                  {typeof filter==='string' &&
                  <>
                  <ColorPicker value={filter} title='Remove Color' onChange={(v)=>{
                    HandleChange(e,v)
                  }}/>
                  </>
                  }
                </div>
            </React.Fragment>
        )
      })}
    </div>
  );
};

export default ImageFilers;
