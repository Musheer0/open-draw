/* eslint-disable */
"use client"
import { Switch } from '@/components/ui/switch'
import { Canvas, FabricObject, Gradient } from 'fabric'
import React, { useState } from 'react'
import {
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  ArrowUpLeft, ArrowUpRight, ArrowDownLeft, ArrowDownRight
} from 'lucide-react'
import { GetGradient } from './gradients'
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { cn } from '@/lib/utils'
import { isEqual } from 'lodash';
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

const GradientEditor = ({ obj, canvas }: { obj: FabricObject, canvas: Canvas }) => {
  const w = obj.getScaledWidth();
  const h = obj.getScaledHeight();

  const dirToCoords = {
    'top-left': { x1: w, y1: h, x2: 0, y2: 0 },
    'top': { x1: w / 2, y1: h, x2: w / 2, y2: 0 },
    'top-right': { x1: 0, y1: h, x2: w, y2: 0 },
    'left': { x1: w, y1: h / 2, x2: 0, y2: h / 2 },
    'right': { x1: 0, y1: h / 2, x2: w, y2: h / 2 },
    'bottom-left': { x1: w, y1: 0, x2: 0, y2: h },
    'bottom': { x1: w / 2, y1: 0, x2: w / 2, y2: h },
    'bottom-right': { x1: 0, y1: 0, x2: w, y2: h },
  };

  const dirMap = [
    ['top-left', 'top', 'top-right'],
    ['left', '', 'right'],
    ['bottom-left', 'bottom', 'bottom-right']
  ];

  const [isEnabled, setIsEnable] = useState(typeof obj?.fill !== 'string');
 const getDirectionFromCoords = (coords: any) => {
  return (Object.keys(dirToCoords) as (keyof typeof dirToCoords)[])
    .find((key) => isEqual(dirToCoords[key], coords)) || "right";
};

const [activeDir, setActiveDir] = useState<keyof typeof dirToCoords>(
    //@ts-ignore
  getDirectionFromCoords(obj.fill?.coords)
);

  //@ts-ignore
  const [colorStops, setColorStops] = useState<{ offset: number, color: string, opacity?: number }[]>(obj.fill?.colorStops || []);
  const [type, setType] = useState(obj?.fill instanceof Gradient ? obj?.fill.type : 'none');

  const updateGradient = (
    newStops = colorStops,
    coords = (obj.fill instanceof Gradient && obj.fill.coords) || dirToCoords[activeDir]
  ) => {
    if (obj.fill instanceof Gradient) {
      const sortedStops = [...newStops].sort((a, b) => a.offset - b.offset);
      obj.set('fill', new Gradient({
        type: obj.fill.type,
        coords,
        gradientUnits: obj.fill.gradientUnits ?? 'pixels',
        colorStops: sortedStops.map(s => ({
          offset: s.offset,
          color: s.color,
          opacity: s.opacity ?? 1
        }))
      }));
      canvas.requestRenderAll();
      canvas.fire("object:modified", { target: obj });
    }
  };

  const handleGradientChange = () => {
    const defaultGradient = GetGradient('linear', w);
    const enable = !isEnabled;
    setIsEnable(enable);
    if (enable) {
      obj.set('fill', defaultGradient);
      setColorStops(defaultGradient.colorStops);
    } else {
      obj.set('fill', 'black');
      setColorStops([]);
    }
    canvas.requestRenderAll();
    canvas.fire("object:modified", { target: obj });
    setType('linear');
  };

  const handleDirChange = (dir: keyof typeof dirToCoords) => {
    setActiveDir(dir);
    updateGradient(colorStops, dirToCoords[dir]);
  };

  const handleColorChange = (i: number, color: string) => {
    const updated = [...colorStops];
    updated[i].color = color;
    setColorStops(updated);
    updateGradient(updated);
  };

  const handleOffsetChange = (i: number, offset: number) => {
    const updated = [...colorStops];
    updated[i].offset = offset / 100;
    setColorStops(updated);
    updateGradient(updated);
  };

  const handleOpacityChange = (i: number, opacity: number) => {
    const updated = [...colorStops];
    updated[i].opacity = opacity / 100;
    setColorStops(updated);
    updateGradient(updated);
  };

  const directions = [
    [<ArrowUpLeft />, <ArrowUp />, <ArrowUpRight />],
    [<ArrowLeft />, null, <ArrowRight />],
    [<ArrowDownLeft />, <ArrowDown />, <ArrowDownRight />],
  ];

  return (
    <div className='flex flex-col border-b border-t py-2'>
      <div className="header flex items-center justify-between gap-2">
        <p className='text-sm font-semibold'>Gradient<span className='text-xs text-muted-foreground'>(unstable)</span></p>
        <Switch checked={isEnabled} onClick={handleGradientChange} />
      </div>

      {isEnabled && (obj.fill instanceof Gradient) &&
        <>
          <Tabs defaultValue={type} className='w-full pt-5'>
            <TabsContent value="linear">
              <div className="color-slip w-full h-10 rounded"
                style={{
                  backgroundImage: `linear-gradient(${colorStops.map(stop => {
                    const alpha = (stop.opacity ?? 1).toFixed(2);
                    return `${stop.color}${alpha === '1.00' ? '' : Math.round(+alpha * 255).toString(16).padStart(2, '0')}`
                  }).join(',')})`
                }}
              />
            </TabsContent>
          </Tabs>

          <div className="color-stops flex flex-col gap-4 py-4">
            <p className='text-sm font-bold'>Color Stops</p>

            {colorStops.map((stop, i) => (
              <div key={i} className="flex flex-col gap-2 p-3 rounded-xl border border-zinc-800">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => handleColorChange(i, e.target.value)}
                  className="w-full h-10"
                />

                <div className="flex justify-between text-xs font-medium text-muted-foreground pt-1">
                  <span>Offset: {Math.round((stop.offset ?? 0) * 100)}%</span>
                  <span>Opacity: {Math.round((stop.opacity ?? 1) * 100)}%</span>
                </div>

                <div className="flex flex-col gap-4">
                  <div className='space-y-2'>
                    <Label className="text-xs">Offset</Label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[Math.round((stop.offset ?? 0) * 100)]}
                      onValueChange={(val) => handleOffsetChange(i, val[0])}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label className="text-xs">Opacity</Label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[Math.round((stop.opacity ?? 1) * 100)]}
                      onValueChange={(val) => handleOpacityChange(i, val[0])}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="direction w-full flex flex-col  gap-2 items-center py-2 justify-center">
            <Label>Gradient Direction</Label>
            <div className="grid grid-cols-3 gap-2 w-fit p-2 rounded-2xl border border-zinc-700 bg-zinc-900">
              {directions.flatMap((row, rowIndex) =>
                row.map((Icon, colIndex) => {
                  const dir = dirMap[rowIndex][colIndex] as keyof typeof dirToCoords;
                  return (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-primary/10 hover:text-primary",
                        activeDir === dir && 'bg-primary/10 text-primary'
                      )}
                      onClick={() => dir && handleDirChange(dir)}
                    >
                      {Icon || (
                        <div className={cn(
                          "w-4 h-4 rounded-full bg-zinc-500",
                          activeDir === dir && 'bg-primary'
                        )} />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default GradientEditor;
