import { Gradient } from "fabric"

export type gradinet ={
    type: "linear"|"radial",
    colorStops: {offset:number,color:string}[]
    cords:{
        x1:number,
        x2:number,
        y1:number,
        y2:number
    }
}


export const GetGradient =(   type: "linear"|"radial",w:number)=>{
    return new  Gradient({
        type,
        gradientUnits:'pixels',
        coords:{
            x1:0,
            x2:w,
            y1:0,
            y2:0
        },
        colorStops:[
            {offset:0,color:'#ffff'},
            {offset:1,color:'#0000'}
        ]
    })
}