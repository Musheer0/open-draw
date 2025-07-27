/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from "react"
import { useCanvas } from "../canvas-provider"
import { IText } from "fabric"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ShieldCheckIcon, ShieldAlertIcon } from "lucide-react"
import {
  Italic,
  Underline,
  Strikethrough,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from 'lucide-react';
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card"
import { HoverCardContent } from "@radix-ui/react-hover-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
type textStyle ={
    property:string,
    value:any
}
const fabricTextStyles = [
  {
    name: 'Italic',
    property: 'fontStyle',
    value: 'italic',
    normal: 'normal',
    icon: Italic
  },
  {
    name: 'Underline',
    property: 'underline',
    value: true,
    normal: false,
    icon: Underline
  },
  {
    name: 'Strikethrough',
    property: 'linethrough',
    value: true,
    normal: false,
    icon: Strikethrough
  },
  {
    name: 'Overline',
    property: 'overline',
    value: true,
    normal: false,
    icon: Type // no real Lucide icon for overline
  },
  {
    name: 'Align Left',
    property: 'textAlign',
    value: 'left',
    normal: 'left',
    icon: AlignLeft
  },
  {
    name: 'Align Center',
    property: 'textAlign',
    value: 'center',
    normal: 'left',
    icon: AlignCenter
  },
  {
    name: 'Align Right',
    property: 'textAlign',
    value: 'right',
    normal: 'left',
    icon: AlignRight
  },
  {
    name: 'Justify',
    property: 'textAlign',
    value: 'justify',
    normal: 'left',
    icon: AlignJustify
  }
];

const fabricTextStyleNames = [
  'Bold',
  'Italic',
  'Underline',
  'Strikethrough',
  'Overline',
  'Align Left',
  'Align Center',
  'Align Right',
  'Justify'
];

const fontWeights = [
  "normal",
  "bold",
  "bolder",
  "lighter",
  "100",
  "200",
  "300",
  "400", // = "normal"
  "500",
  "600",
  "700", // = "bold"
  "800",
  "900"
];

const fontFamilies = [
  { name: "Avenir", safe: false },
  { name: "Bahnschrift", safe: true },
  { name: "Baskerville", safe: true },
  { name: "Bebas Neue", safe: false }, // added
  { name: "Calibri", safe: true },
  { name: "Cambria", safe: true },
  { name: "Candara", safe: true },
  { name: "Comic Sans MS", safe: true },
  { name: "Consolas", safe: true },
  { name: "Copperplate", safe: true },
  { name: "Courier New", safe: true },
  { name: "Cursive", safe: true },
  { name: "Didot", safe: true },
  { name: "Fira Code", safe: false }, // added
  { name: "Franklin Gothic Medium", safe: true },
  { name: "Garamond", safe: true },
  { name: "Geneva", safe: true },
  { name: "Georgia", safe: true },
  { name: "Goudy Old Style", safe: true },
  { name: "Helvetica", safe: true },
  { name: "Impact", safe: true },
  { name: "Inconsolata", safe: false },
  { name: "Inter", safe: false }, // added
  { name: "JetBrains Mono", safe: false }, // added
  { name: "Lato", safe: false },
  { name: "Liberation Sans", safe: true },
  { name: "Lucida Console", safe: true },
  { name: "Lucida Sans Unicode", safe: true },
  { name: "Manrope", safe: false }, // added
  { name: "Menlo", safe: true },
  { name: "Monaco", safe: true },
  { name: "Monospace", safe: true },
  { name: "Montserrat", safe: false }, // added
  { name: "Noto Sans", safe: false },
  { name: "Noto Serif", safe: false },
  { name: "Open Sans", safe: false }, // added
  { name: "Oswald", safe: false },
  { name: "Palatino", safe: true },
  { name: "Papyrus", safe: true },
  { name: "Poppins", safe: false }, // added
  { name: "Raleway", safe: false }, // added
  { name: "Roboto", safe: false }, // added
  { name: "Roboto Condensed", safe: false },
  { name: "Rockwell", safe: true },
  { name: "Sans-serif", safe: true },
  { name: "Segoe UI", safe: true },
  { name: "Serif", safe: true },
  { name: "Source Code Pro", safe: false },
  { name: "Space Grotesk", safe: false }, // added
  { name: "Tahoma", safe: true },
  { name: "Times", safe: true },
  { name: "Times New Roman", safe: true },
  { name: "Trebuchet MS", safe: true },
  { name: "Ubuntu", safe: false }, // added
  { name: "Verdana", safe: true },
  { name: "Work Sans", safe: false }
];
const TextSettings = () => {
  const { canvas } = useCanvas()
  const [activeObject, setActiveObject] = useState<any | null>(null);
  const [fontWeight ,setFontWeight] = useState(fontWeights[0])
  const [searchQuery, setSearchQuery] = useState("")

  const updateCanvas = () => {
    canvas?.renderAll()
    canvas?.requestRenderAll()
  }
  const [fontSize ,setFontSize] = useState(0);
  const [lineHeight ,setLineHeight] = useState(1.16);
  const [charSpace,setCharSpace] = useState(0)
  const isFont = canvas && activeObject && activeObject instanceof IText
  const handleSelection = () => {
    if (canvas) {
      setActiveObject(canvas.getActiveObject())
      updateStatus()
    }
  }
  const updateStatus = ()=>{
    if(isFont){
      const weight = activeObject.fontWeight;
      setFontWeight(weight.toString());
      const font_size = activeObject.fontSize;
      setFontSize(font_size);  
      setLineHeight(activeObject?.lineHeight)    
    }
  }
  useEffect(() => {
    if (!canvas) return
    canvas.on("selection:created", handleSelection)
    canvas.on("selection:updated", handleSelection)
    canvas.on("selection:cleared", () => setActiveObject(null))

    return () => {
      canvas.off("selection:created", handleSelection)
      canvas.off("selection:updated", handleSelection)
      canvas.off("selection:cleared",handleSelection)
    }
  }, [canvas])
  useEffect(()=>{
    updateStatus()
  },[activeObject])
  const HandleFontFamilyChange = async (e: string) => {
    await document.fonts.ready
    if (isFont) {
      activeObject.set({ fontFamily: e })
      updateCanvas()
    }
  }
  const HandleFontSizeChange= (e:string)=>{
     if (isFont) {
                        setFontSize(Number(e));

      activeObject.set({ fontSize: Number(e) })
      updateCanvas()
    }
  }
  const HandleFontWeightChange = (e:string)=>{
    if(isFont){
            setFontWeight(e)
            activeObject.set({
                fontWeight:e
            });
            updateCanvas();
    }
  }
  const HandleFontStyleChange = (e:textStyle)=>{
    if(isFont){
        const currentPropertyObj =fabricTextStyles.find((f)=>f.property===e.property);
        const currentValue = activeObject.get(e.property)
      activeObject.set({
  [e.property]: currentValue === e.value ? currentPropertyObj?.normal|| false : e.value
});

        updateCanvas()
    }
  }
  // filtered list based on search
  const filteredFonts = fontFamilies.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const HandlelineHeight = (e:number)=>{
    if(isFont){
     activeObject.set({
      lineHeight: e==0? 0.1:e
     });
     setLineHeight( e==0? 0.1:e)
     updateCanvas();
    }
  }
  const HandleLetterSpacing = (e:number)=>{
    if(isFont){
      const spacing = e<=3000? e: 3000;
      activeObject.set({
        charSpacing:spacing
      });
      setCharSpace(spacing);
      updateCanvas();
    }
  }
 
  if (canvas && activeObject )
    return (
 <>
  {/* === Style Icons === */}
  <div className={cn(
    "flex transition-all  duration-500 ease-in-out items-center gap-2 bg-background fixed  px-3 py-2 rounded-xl  flex-col border top-1/2 -translate-y-1/2 z-10",
    isFont ? "right-[330px]  pointer-events-auto":"opacity-0 pointer-events-auto right-0"
  )}>
    {fabricTextStyles.map((style, i) => (
      <HoverCard key={i}>
        <HoverCardTrigger onClick={() => HandleFontStyleChange({ property: style.property, value: style.value })}>
          <Button variant="outline" size="icon">
            <style.icon />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent side="left" className="rounded-full  bg-background p-2 border px-3 w-fit">
          {style.name}
        </HoverCardContent>
      </HoverCard>
    ))}
  </div>

   <div className={
    cn(
        "fixed z-50 top-[4.5rem] transition-all duration-500 ease-in-out left-1/2 -translate-x-1/2 bg-background/70 border rounded-2xl px-4 py-2 flex items-center gap-6 w-fit",
        isFont ? " top-[4.5rem] opacity-100":'pointer-events-none opacity-0 top-0'
    )
   }>
  
 
  {/* === Font Size === */}
  <div className="flex items-center gap-2">
    <label className="text-sm whitespace-nowrap">Font Size:</label>
    <Input
      type="number"
      min={0}
      value={fontSize}
      onChange={(e) => HandleFontSizeChange(e.target.value)}
      className="w-20 text-sm"
    />
  </div>
   {/*===Line Height === */}
   <div className="flex items-center gap-2">
    <label className="text-sm whitespace-nowrap">Line Height:</label>
    <Input
      type="number"
      min={0.1}
      max={5}
      value={lineHeight}
      onChange={(e) => HandlelineHeight(Number(e.target.value))}
      className="w-20 text-sm"
    />
  </div>
     {/*===Letter Spacing === */}
   <div className="flex items-center gap-2">
    <label className="text-sm whitespace-nowrap">Letter Spacing:</label>
    <Input
      type="number"
      min={-1000}
      max={3000}
      value={charSpace}
      onChange={(e) => HandleLetterSpacing(Number(e.target.value))}
      className="w-20 text-sm"
    />
  </div>
  {/* === Font Family === */}
  <div className="flex items-center gap-2">
    <Select defaultValue={activeObject?.fontFamily} onValueChange={HandleFontFamilyChange}>
      <SelectTrigger className="min-w-[180px]">
        <SelectValue placeholder="Select Font Family" />
      </SelectTrigger>
      <SelectContent className="max-h-72 overflow-y-auto">
        <div className="p-2">
          <Input
            placeholder="Search fonts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm"
          />
        </div>
        {filteredFonts.map((f, i) => (
          <SelectItem key={i} value={f.name} style={{ fontFamily: f.name }}>
            <div className="flex items-center justify-between w-full">
              {f.name}
              {f.safe ? (
                <ShieldCheckIcon size={15} className="text-emerald-500 ml-2" />
              ) : (
                <ShieldAlertIcon size={15} className="text-destructive ml-2" />
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

  {/* === Font Weight === */}
  <div className="flex items-center gap-2">
    <label className="text-sm whitespace-nowrap">Font Weight:</label>
    <Select onValueChange={HandleFontWeightChange}>
      <SelectTrigger className="min-w-[140px]">
        <SelectValue placeholder={fontWeight} />
      </SelectTrigger>
      <SelectContent>
        {fontWeights.map((weight, i) => (
          <SelectItem
            key={i}
            value={weight}
            style={{ fontWeight: weight }}
          >
            {weight}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
</div>
 </>

    )
  else return <></>
}

export default TextSettings
