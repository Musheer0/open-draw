import { mutation, query } from "./_generated/server";

import { ConvexError, v } from "convex/values";
export const uploadImage = mutation({
    args: {url: v.string(),fileId:v.string(),name:v.string()},
    handler:async(ctx,args)=>{
        const identity =await ctx.auth.getUserIdentity()
        if(!identity) throw new ConvexError("please login to upload");
        const userId = identity.subject;
        const url = args.url;
        const date = Date.now();
        const data = await ctx.db.insert("image",{
            user_id:userId,
            url,
            file_id:args.fileId,
            name:args.name
        });
      
        return {
            _id:data,
            url,
             _creationTime:date,
             user_id:userId
        }
    }
});
export const getImages= query({
    handler:async(ctx)=>{
         const identity =await ctx.auth.getUserIdentity()
        if(!identity) return []
        const userId = identity.subject;
        const data =await ctx.db.query("image").filter((q)=>q.eq(q.field("user_id"),userId))
        .order("desc").take(50)
        
 return data   }
});

export const deleteImages = mutation({
    args:({
        ids: v.array(v.id("image"))
    }),
    handler:async(ctx,{ids})=>{
         const identity =await ctx.auth.getUserIdentity()

        if(!identity) throw new ConvexError("please login ");
        const userId = identity.subject;
        const result:Record<string,boolean> = {}
        for (const id of ids){
            const data = await ctx.db.get(id);
            if(!data) {
                result[id] = false;
            };
            if(data?.user_id!==userId){
                result[id] = false;
            }
            await ctx.db.delete(id);
               result[id] = true;
        }   
        return result
    }
});
