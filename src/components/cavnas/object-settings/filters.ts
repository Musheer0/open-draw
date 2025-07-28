import { FabricImage, FabricObject,filters } from "fabric";
type commonProps ={
activeObject:FabricObject, cb:()=>void
}
const getIndex = (obj: FabricImage, type: string) =>
  obj.filters.findIndex((f) => f && f.type === type);
export const Brightness = (args: commonProps, val: number) => {
  if (args.activeObject instanceof FabricImage) {
    const i = getIndex(args.activeObject, 'Brightness');
    if (i !== -1 && args.activeObject.filters[i] instanceof filters.Brightness) {
      args.activeObject.filters[i].brightness = val;
           args.activeObject.applyFilters()
      args.cb();
      return;
    }
    args.activeObject.filters.push(new filters.Brightness({ brightness: val }));
     args.activeObject.applyFilters()
     args.cb()
  }
};

export const Blur = (args: commonProps, val: number) => {
  console.log(val)
  if (!(args.activeObject instanceof FabricImage)) return;

  const blurIndex = getIndex(args.activeObject, 'blur');

  if (val === 0) {
    if (blurIndex !== -1) {
      args.activeObject.filters.splice(blurIndex, 1);
      
    }
  } else {
    if (blurIndex !== -1 && args.activeObject.filters[blurIndex] instanceof filters.Blur) {
      args.activeObject.filters[blurIndex].blur = val;
    } else {
      args.activeObject.filters.push(new filters.Blur({ blur: val }));
    }
  }

  args.activeObject.applyFilters();
  args.cb();
};

export const Contrast = (args: commonProps, val: number) => {
  if (args.activeObject instanceof FabricImage) {
    const i = getIndex(args.activeObject, 'Contrast');
    if (i !== -1 && args.activeObject.filters[i] instanceof filters.Contrast) {
      args.activeObject.filters[i].contrast = val;
           args.activeObject.applyFilters()

      args.cb();
      return;
    }
    args.activeObject.filters.push(new filters.Contrast({ contrast: val }));
        args.activeObject.applyFilters()
     args.cb()
  }
};
export const Grayscale = (args: commonProps, toggle: boolean) => {
  if (args.activeObject instanceof FabricImage) {
    const i = getIndex(args.activeObject, 'Grayscale');
    if (i !== -1 && toggle === false) {
      args.activeObject.filters.splice(i, 1);
           args.activeObject.applyFilters()

      args.cb();
      return;
    }
    if (i === -1 && toggle === true) {
      args.activeObject.filters.push(new filters.Grayscale());
          args.activeObject.applyFilters()
     args.cb()
    }
  }
};
export const Invert = (args: commonProps, toggle: boolean) => {
  if (args.activeObject instanceof FabricImage) {
    const i = getIndex(args.activeObject, 'Invert');
    if (i !== -1 && toggle === false) {
      args.activeObject.filters.splice(i, 1);
           args.activeObject.applyFilters()

      args.cb();
      return;
    }
    if (i === -1 && toggle === true) {
      args.activeObject.filters.push(new filters.Invert());
          args.activeObject.applyFilters()
     args.cb()
    }
  }
};
export const Noise = (args: commonProps, val: number) => {
  if (args.activeObject instanceof FabricImage) {
    const i = getIndex(args.activeObject, 'Noise');
    if (i !== -1 && args.activeObject.filters[i] instanceof filters.Noise) {
      args.activeObject.filters[i].noise = val;
           args.activeObject.applyFilters()

      args.cb();
      return;
    }
    args.activeObject.filters.push(new filters.Noise({ noise: val }));
        args.activeObject.applyFilters()
     args.cb()
  }
};
export const Pixelate = (args: commonProps, val: number) => {
  if (args.activeObject instanceof FabricImage) {
    const i = getIndex(args.activeObject, 'Pixelate');
    if (i !== -1 && args.activeObject.filters[i] instanceof filters.Pixelate) {
      args.activeObject.filters[i].blocksize = val;
           args.activeObject.applyFilters()

      args.cb();
      return;
    }
    args.activeObject.filters.push(new filters.Pixelate({ blocksize: val }));
        args.activeObject.applyFilters()
     args.cb()
  }
};
export const Sepia = (args: commonProps, toggle: boolean) => {
  if (args.activeObject instanceof FabricImage) {
    const i = getIndex(args.activeObject, 'Sepia');
    if (i !== -1 && toggle === false) {
      args.activeObject.filters.splice(i, 1);
           args.activeObject.applyFilters()

      args.cb();
      return;
    }
    if (i === -1 && toggle === true) {
      args.activeObject.filters.push(new filters.Sepia());
          args.activeObject.applyFilters()
     args.cb()
    }
  }
};
export const RemoveColor = (args: commonProps, color: string) => {
  if (args.activeObject instanceof FabricImage) {
    const i = getIndex(args.activeObject, 'RemoveColor');
    if (i !== -1 && args.activeObject.filters[i] instanceof filters.RemoveColor) {
      args.activeObject.filters[i].color = color;
           args.activeObject.applyFilters()

      args.cb();

      return;
    }
    args.activeObject.filters.push(new filters.RemoveColor({ color }));
        args.activeObject.applyFilters()
     args.cb()
  }
};
export const Saturation = (args: commonProps, val: number) => {
  if (args.activeObject instanceof FabricImage) {
    const i = getIndex(args.activeObject, 'Saturation');
    if (i !== -1 && args.activeObject.filters[i] instanceof filters.Saturation) {
      args.activeObject.filters[i].saturation = val;
           args.activeObject.applyFilters()

      args.cb();
      return;
    }
    args.activeObject.filters.push(new filters.Saturation({ saturation: val }));
        args.activeObject.applyFilters()
     args.cb()
  }
};
export const HueRotation = (args: commonProps, val: number) => {
  if (args.activeObject instanceof FabricImage) {
    const i = getIndex(args.activeObject, 'HueRotation');
    if (i !== -1 && args.activeObject.filters[i] instanceof filters.HueRotation) {
      args.activeObject.filters[i].rotation = val;
           args.activeObject.applyFilters()

      args.cb();
      return;
    }
    args.activeObject.filters.push(new filters.HueRotation({ rotation: val }));
        args.activeObject.applyFilters()
     args.cb()
  }
};

type FilterMeta = {
  fun: (conmmomProps:commonProps,...args: any[]) => void;
  name: string;
  input: 'number' | 'boolean' | 'string';
  isColor: boolean;
};

export const filtersMeta: FilterMeta[] = [
  {
    fun: Blur,
    name: 'Blur',
    input: 'number',
    isColor: false,
  },
  {
    fun: Contrast,
    name: 'Contrast',
    input: 'number',
    isColor: false,
  },
  {
    fun: Grayscale,
    name: 'Grayscale',
    input: 'boolean',
    isColor: false,
  },
  {
    fun: Invert,
    name: 'Invert',
    input: 'boolean',
    isColor: false,
  },
  {
    fun: Noise,
    name: 'Noise',
    input: 'number',
    isColor: false,
  },
  {
    fun: Pixelate,
    name: 'Pixelate',
    input: 'number',
    isColor: false,
  },
  {
    fun: Sepia,
    name: 'Sepia',
    input: 'boolean',
    isColor: false,
  },
  {
    fun: RemoveColor,
    name: 'RemoveColor',
    input: 'string',
    isColor: true,
  },
  {
    fun: Saturation,
    name: 'Saturation',
    input: 'number',
    isColor: false,
  },
  {
    fun: HueRotation,
    name: 'HueRotation',
    input: 'number',
    isColor: false,
  },
];
