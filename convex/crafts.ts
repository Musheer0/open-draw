import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllCrafs = query({
    handler:async(ctx)=>{
          const identity =await ctx.auth.getUserIdentity()
                if(!identity) return []
                const userId = identity.subject;
                const crafts = await ctx.db.query("craft")
                .filter((f)=>f.eq("user_id",userId)).take(50)
                return crafts
    }   
});
export const createCraft =  mutation({
    args:{
        w:v.number(),
        h:v.number(),
        name:v.optional(v.string()),
    },
    handler:async(ctx,{w,h,name})=>{
          const identity =await ctx.auth.getUserIdentity()
                if(!identity) return null
                const userId = identity.subject;
          await ctx.db.insert("craft",{
            user_id:userId,
            width:w,
            height:h,
            name:name||'project',
            data:null
          })
    }
});
export const updateCraft = mutation({
  args: {
    id: v.id("craft"),
    data: v.optional(v.any()),
    name: v.optional(v.string()),
  },
  handler: async (ctx, { id, data, name }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const userId = identity.subject;
    const craft = await ctx.db.get(id);
    if (!craft || craft.user_id !== userId) return null;

    const updateFields: Record<string, any> = {};
    if (name !== undefined) updateFields.name = name;
    if (data !== undefined) updateFields.data = data;

    if (Object.keys(updateFields).length > 0) {
      await ctx.db.patch(id, updateFields);
    }
  },
});

export const deleteCraft = mutation({
    args:{
        id: v.id("craft")
    },
    handler:async(ctx,{id})=>{
           const identity =await ctx.auth.getUserIdentity()
                if(!identity) return null
                const userId = identity.subject;
           const Exists = (await ctx.db.query("craft").take(1)).filter((q)=>q.user_id===userId &&q._id===id);
        if(!Exists) return
        await ctx.db.delete(id)
    }
})