import {
  ImageIcon,
  SettingsIcon,
  PaletteIcon,
  SquareIcon,
  CircleIcon,
  TriangleIcon,
  HeadingIcon,
  LineChartIcon,
  PentagonIcon,
  HexagonIcon,
} from "lucide-react";
import AddImageDropDown from "./components/cavnas/image/add-image-drop-down";
import BackgroundSettings from "./components/cavnas/background-settings/background-settings";


export const SingleCickInsertOptions = [
  {
    name: 'Square',
    icon: SquareIcon,
    slug: 'rect' as InsertOptionsSlug,
    img: null,
  },
  {
    name: 'Circle',
    icon: CircleIcon,
    slug: 'circle' as InsertOptionsSlug,
    img: null,
  },
  {
    name: 'Triangle',
    icon: TriangleIcon,
    slug: 'triangle' as InsertOptionsSlug,
    img: null,
  },
  {
    name: 'Line',
    icon: LineChartIcon,
    slug: 'line' as InsertOptionsSlug,
    img: null,
  },
  {
    name: 'Ellipse',
    icon: null,
    slug: 'ellipse' as InsertOptionsSlug,
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
    slug: 'i-text' as InsertOptionsSlug,
    img: null,
  },
];


export const InsertOptions = [
  {
    name: 'Image',
    icon: ImageIcon,
    slug: 'image' as InsertOptionsSlug,
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
  | 'rect'   // Rectangle / Square
  | 'circle'   // Circle
  | 'triangle'  // Triangle
  | 'line'   // Line
  | 'ellipse'   // Ellipse
  | 'sh-pg'  // Polygon
  | 'sh-h'  // Polyline
  | 'sh-pt'  // Path
  | 'sh-p'   // Pen tool (free drawing or path)
  | 'i-text'    // Text
  | 'image'    // Image
  | 'bg'     // Background
  | 'tp'     // Template
  | 'sg';    // Sticker / SVG
