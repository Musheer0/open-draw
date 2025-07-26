import { InsertOptionsSlug } from "@/canvas-options";
import { Canvas, Circle, Ellipse, IText, Line, Path, Polygon, Rect, Triangle } from "fabric";
export const  AddShape = (canvas:Canvas|null, shape:InsertOptionsSlug)=>{
    
    if(canvas){
       if(shape=='sh-r'){
         const new_shape = new  Rect({
            width:50,
            height:50,
            top:50,
            left:50,
            fill:'black',
            strokeWidth: 0
        });
        canvas.add(new_shape);
        canvas.renderAll()
       }
       if(shape=='sh-c'){
         const new_shape = new  Circle({
           radius:25,
            top:50,
            left:50,
            fill:'black',
            strokeWidth: 0
        });
        canvas.add(new_shape);
        canvas.renderAll()
       }
       if(shape=='sh-tr'){
         const new_shape = new  Triangle({
            width:50,
            height:50,
            top:0,
            left:0,
            fill:'black',
            strokeWidth: 0,
            angle:0
        });
        canvas.add(new_shape);
        canvas.renderAll()
       }
       if(shape=='sh-l'){
         const new_shape =new Line([50,50,200,200],{
                left:50,
                right:50,
                stroke: 'black',
                strokeWidth:4
            });
        canvas.add(new_shape);
        canvas.renderAll()
       }
       if(shape=='sh-e'){
         const new_shape = new Ellipse({
        rx: 50,
        ry: 30,
        left: 100,
        top: 100,
        originX: "left",
        originY: "top",
        fill: "black",
      });
        canvas.add(new_shape);
        canvas.renderAll()
       }
       if(shape==="sh-pt"){
         const new_shape = new Path("M 0 0 L 100 100 L 200 0 Z", {
        left: 100,
        top: 100,
        fill: "black",
        stroke: "black",
        strokeWidth: 1,
      });
        canvas.add(new_shape);
        canvas.renderAll()
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
        canvas.add(new_shape);
        canvas.renderAll()
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
        canvas.add(new_shape);
        canvas.renderAll()
       }
       if(shape==="txt"){
       const text = new IText('Your Text Here');
       canvas.add(text);
       canvas.renderAll()
    }
}
}
export const  DuplicateObject = async(canvas:Canvas|null)=>{
    
    if(canvas){
        const active = canvas.getActiveObject()
    if (!active) return
       const cloned =await active.clone()
        cloned.set({
            top:cloned.top+10,
            left:cloned.left+10
        })
      canvas.add(cloned)
      canvas.setActiveObject(cloned)
      canvas.requestRenderAll()
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
