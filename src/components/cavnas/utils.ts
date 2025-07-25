import { InsertOptionsSlug } from "@/canvas-options";
import { Canvas, Circle, IText, Line, Rect, Triangle } from "fabric";
import fabric from 'fabric'
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
            angle:2
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
