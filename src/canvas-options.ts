import {
  ImageIcon,
  SettingsIcon,
  PaletteIcon,
  SquareIcon,
  CircleIcon,
  TriangleIcon,
  HeadingIcon,
  LineChartIcon,
  PenToolIcon,
  PentagonIcon,
  HexagonIcon,
  LucideIcon
} from "lucide-react";
import AddImageDropDown from "./components/cavnas/image/add-image-drop-down";
import BackgroundSettings from "./components/cavnas/background-settings/background-settings";


export const SingleCickInsertOptions = [
  {
    name: 'Square',
    icon: SquareIcon,
    slug: 'sh-r' as InsertOptionsSlug,
    img: null,
  },
  {
    name: 'Circle',
    icon: CircleIcon,
    slug: 'sh-c' as InsertOptionsSlug,
    img: null,
  },
  {
    name: 'Triangle',
    icon: TriangleIcon,
    slug: 'sh-tr' as InsertOptionsSlug,
    img: null,
  },
  {
    name: 'Line',
    icon: LineChartIcon,
    slug: 'sh-l' as InsertOptionsSlug,
    img: null,
  },
  {
    name: 'Ellipse',
    icon: null,
    slug: 'sh-e' as InsertOptionsSlug,
    img: '/sh-e.png',
  },
  {
    name: 'Pentagon',
    icon: PentagonIcon,
    slug: 'sh-pt' as InsertOptionsSlug,
    img: null,
  },
  {
    name: 'Polyline',
    icon: HexagonIcon,
    slug: 'sh-h' as InsertOptionsSlug,
    img: null,
  },
  // {
  //   name: 'Path',
  //   icon: PenToolIcon,
  //   slug: 'sh-pt' as InsertOptionsSlug,
  //   img: null,
  // },
  {
    name: 'Text',
    icon: HeadingIcon,
    slug: 'txt' as InsertOptionsSlug,
    img: null,
  },
];


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
    name: 'Settings',
    icon: SettingsIcon,
    slug: 'sg' as InsertOptionsSlug,
        component:AddImageDropDown

  },
]

export type InsertOptionsSlug =
  | 'sh-r'   // Rectangle / Square
  | 'sh-c'   // Circle
  | 'sh-tr'  // Triangle
  | 'sh-l'   // Line
  | 'sh-e'   // Ellipse
  | 'sh-pg'  // Polygon
  | 'sh-h'  // Polyline
  | 'sh-pt'  // Path
  | 'sh-p'   // Pen tool (free drawing or path)
  | 'txt'    // Text
  | 'img'    // Image
  | 'bg'     // Background
  | 'tp'     // Template
  | 'sg';    // Sticker / SVG
