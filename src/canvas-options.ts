import {
  ImageIcon,
  SettingsIcon,
  TextIcon,
  PaletteIcon,
  LayoutTemplateIcon,
  SquareIcon,
  CircleIcon,
  TriangleIcon,
  PencilIcon,
  PenIcon,
  HeadingIcon
} from "lucide-react";
import AddImageDropDown from "./components/cavnas/image/add-image-drop-down";
import BackgroundSettings from "./components/cavnas/background-settings/background-settings";



export const SingleCickInsertOptions =[
      {
    name: 'Square',
    icon: SquareIcon,
    slug: 'sh-r' as InsertOptionsSlug,
    img:null
  },
      {
    name: 'Circle',
    icon: CircleIcon,
    slug: 'sh-c' as InsertOptionsSlug,
    img:null
  },
      {
    name: 'Triangle',
    icon: TriangleIcon,
    slug: 'sh-tr' as InsertOptionsSlug,
    img:null
  },
      {
    name: 'Line',
    icon: null,
    slug: 'sh-l' as InsertOptionsSlug,
    img: '/sh-l.png'
  },
  // {
  //   name: 'Pen',
  //   icon: PenIcon,
  //   slug: 'sh-p' as InsertOptionsSlug,
  //   img:null
  // },
  {
    name: 'Text',
    icon: HeadingIcon,
    slug: 'txt' as InsertOptionsSlug,
    img:null
  },
]


export const InsertOptions = [
  {
    name: 'Image',
    icon: ImageIcon,
    slug: 'img' as InsertOptionsSlug,
    component:AddImageDropDown
  },
  {
    name: 'Background',
    icon: PaletteIcon, 
    slug: 'bg' as InsertOptionsSlug,
    component:BackgroundSettings

  },
  {
    name: 'Templates',
    icon: LayoutTemplateIcon, 
    slug: 'tp' as InsertOptionsSlug,
        component:AddImageDropDown

  },
  {
    name: 'Settings',
    icon: SettingsIcon,
    slug: 'sg' as InsertOptionsSlug,
        component:AddImageDropDown

  },
]

export type InsertOptionsSlug = 'sh-r'|'sh-c'|'sh-tr'|'sh-l' | 'txt' | 'img' | 'bg' | 'tp' | 'sg'|'sh-p';
