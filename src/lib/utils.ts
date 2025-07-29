import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  Instagram,
  Youtube,
  Presentation,
  FileText,
  Facebook,
  Twitter,
  Linkedin,
  ImageIcon,
  LucideIcon
} from 'lucide-react';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const canvasSizeOptionsArray: {
  name: string;
  width: number;
  height: number;
  icon: LucideIcon;
}[] = [
  {
    name: 'Post',
    width: 500,
    height: 500,
    icon: Instagram,
  },
  {
    name: 'Story',
    width: 473,
    height: 700,
    icon: Instagram,
  },
  {
    name: 'Thumbnail',
    width: 700,
    height: 394,
    icon: Youtube,
  },
  {
    name: 'Banner',
    width: 700,
    height: 394,
    icon: Youtube,
  },
  {
    name: 'Post',
    width: 500,
    height: 500,
    icon: Youtube,
  },
  {
    name: 'PPT ',
    width: 700,
    height: 394,
    icon: Presentation,
  },
  {
    name: 'Flyer',
    width: 508,
    height: 700,
    icon: FileText,
  },
  {
    name: 'Post',
    width: 700,
    height: 368,
    icon: Facebook,
  },
  {
    name: 'Post',
    width: 700,
    height: 394,
    icon: Twitter,
  },
  {
    name: 'Post',
    width: 700,
    height: 366,
    icon: Linkedin,
  },
  {
    name: 'Pinterest',
    width: 467,
    height: 700,
    icon: ImageIcon, // closest match
  },
];



export const StickerList = [
    'https://cdn-icons-png.flaticon.com/256/428/428094.png',
    'https://cdn-icons-png.flaticon.com/256/2111/2111463.png',
    'https://cdn-icons-png.flaticon.com/256/5968/5968764.png',
    'https://cdn-icons-png.flaticon.com/256/1384/1384060.png',
    'https://cdn-icons-png.flaticon.com/256/733/733585.png',
    'https://cdn-icons-png.flaticon.com/256/2111/2111646.png',
    'https://cdn-icons-png.flaticon.com/256/4494/4494477.png',
    'https://cdn-icons-png.flaticon.com/256/281/281764.png',
    'https://cdn-icons-png.flaticon.com/256/1409/1409941.png',
    'https://cdn-icons-png.flaticon.com/256/10851/10851235.png',
    'https://cdn-icons-png.flaticon.com/256/520/520460.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791311.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791320.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791292.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791355.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791307.png',
    'https://cdn-icons-png.flaticon.com/256/7996/7996409.png',
    'https://cdn-icons-png.flaticon.com/256/8760/8760748.png',
    'https://cdn-icons-png.flaticon.com/256/5171/5171530.png',
    'https://cdn-icons-png.flaticon.com/256/5175/5175169.png',
    'https://cdn-icons-png.flaticon.com/256/7096/7096435.png',
    'https://cdn-icons-png.flaticon.com/256/346/346167.png',
    'https://cdn-icons-png.flaticon.com/256/1776/1776968.png',
    'https://cdn-icons-png.flaticon.com/256/1497/1497177.png',
    'https://cdn-icons-png.flaticon.com/256/2517/2517029.png',
    'https://cdn-icons-png.flaticon.com/256/2276/2276906.png',
    'https://cdn-icons-png.flaticon.com/256/6604/6604292.png',
    'https://cdn-icons-png.flaticon.com/256/6010/6010131.png',
    'https://cdn-icons-png.flaticon.com/256/11167/11167978.png',
    'https://cdn-icons-png.flaticon.com/256/11145/11145432.png',
    'https://cdn-icons-png.flaticon.com/256/7645/7645528.png',
    'https://cdn-icons-png.flaticon.com/256/16116/16116383.png',
    'https://cdn-icons-png.flaticon.com/256/639/639373.png'
]