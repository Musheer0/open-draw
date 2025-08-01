import { InsertOptionsSlug } from "@/canvas-options";
import { Canvas, Circle, Ellipse, FabricObject, IText, Line,  Polygon, Rect, Shadow, Triangle } from "fabric";
export const  AddShape = (canvas:Canvas|null, shape:InsertOptionsSlug)=>{
    
    if(canvas){
      const updatedCanvas = (obj:FabricObject)=>{
          canvas.add(obj);
        canvas.setActiveObject(obj)
        canvas.renderAll()
      }
       if(shape=='rect'){
         const new_shape = new  Rect({
            width:50,
            height:50,
            top:50,
            left:50,
            fill:'black',
            strokeWidth: 0
        });
       updatedCanvas(new_shape);
       }
       if(shape=='circle'){
         const new_shape = new  Circle({
           radius:25,
            top:50,
            left:50,
            fill:'black',
            strokeWidth: 0
        });
     updatedCanvas(new_shape);
       }
       if(shape=='triangle'){
         const new_shape = new  Triangle({
            width:50,
            height:50,
            top:0,
            left:0,
            fill:'black',
            strokeWidth: 0,
            angle:0,
            
        });
    updatedCanvas(new_shape);
       }
       if(shape=='line'){
         const new_shape =new Line([50,50,200,200],{
                left:50,
                right:50,
                stroke: 'black',
                strokeWidth:4,
                
            });
    updatedCanvas(new_shape);
       }
       if(shape=='ellipse'){
         const new_shape = new Ellipse({
        rx: 50,
        ry: 30,
        left: 100,
        top: 100,
        originX: "left",
        originY: "top",
        fill: "black",
      });
    updatedCanvas(new_shape);
       }
       if(shape=='sh-pt'){
        
       const size = 50;
       const centerX = 100;
       const centerY = 100;

       const pentagonPoints = Array.from({ length: 5 }, (_, i) => {
      const angle = (i * (2 * Math.PI)) / 5 - Math.PI / 2; // start at top
       return {
        x: centerX + size * Math.cos(angle),
       y: centerY + size * Math.sin(angle),
      };
       });
         const new_shape = new Polygon(pentagonPoints,
        {
          left: 100,
          top: 100,
          fill: "black",
        }
      );
    updatedCanvas(new_shape);
       }
         if(shape=='sh-h'){
        
         const size = 50;
         const centerX = 100;
           const centerY = 100;

            const pentagonPoints = Array.from({ length: 6 }, (_, i) => {
           const angle = (i * (2 * Math.PI)) / 6 - Math.PI / 2; // start at top
            return {
         x: centerX + size * Math.cos(angle),
            y: centerY + size * Math.sin(angle),
        };
       });
         const new_shape = new Polygon(pentagonPoints,
        {
          left: 100,
          top: 100,
          fill: "black",
        }
      );
           updatedCanvas(new_shape);

       }
       if(shape==="i-text"){
       const text = new IText('Your Text Here');
    updatedCanvas(text);
    }
}
}
export const  DuplicateObject = async(canvas:Canvas|null)=>{
    
    if(canvas){
        const active = canvas.getActiveObjects()
    if (active.length>1) return
      for (const obj of active){
          const cloned =await obj.clone()
        cloned.set({
            top:cloned.top+10,
            left:cloned.left+10
        })
      canvas.add(cloned)

      canvas.requestRenderAll()
      }
    // active.clone((cloned) => {
    //   // Offset the clone so it's not stacked on top
    //   cloned.set({
    //     left: (active.left ?? 0) + 30,
    //     top: (active.top ?? 0) + 30
    //   })

    //   canvas.add(cloned)
    //   canvas.setActiveObject(cloned)
    //   canvas.requestRenderAll()
    // })

    }
}

export const AddShadow = (canvas:Canvas, obj:FabricObject)=>{
  if(obj?.shadow){
    obj.set("shadow", null)
    canvas.requestRenderAll()
      return
  }
  obj.set('shadow', new Shadow({
 color: 'rgba(0,0,0,0.5)', 
  blur: 10,                 
  offsetX: 5,               
  offsetY: 5,             
  }))
  
      canvas.requestRenderAll()
}