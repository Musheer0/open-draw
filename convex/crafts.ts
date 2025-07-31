import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllCrafs = query({
    handler:async(ctx)=>{
          const identity =await ctx.auth.getUserIdentity()
                if(!identity) {
                  console.log('no user')
                  return []}
                const userId = identity.subject;
                const crafts = await ctx.db.query("craft") .withIndex("by_userId", (q) => q.eq("user_id", userId))
      .take(50);
                return crafts
    }   
});
export const createCraft =  mutation({
    args:{
        w:v.number(),
        h:v.number(),
    },
    handler:async(ctx,{w,h})=>{
          const identity =await ctx.auth.getUserIdentity()
                if(!identity) return null
                const userId = identity.subject;
         const id = await ctx.db.insert("craft",{
            user_id:userId,
            width:w,
            height:h,
            data:null
          })
          return id
    }
});
export const updateCraft = mutation({
  args: {
    id: v.id("craft"),
    data: v.optional(v.any()),
  },
  handler: async (ctx, { id, data}) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const userId = identity.subject;
    const craft = await ctx.db.get(id);
    if (!craft || craft.user_id !== userId) return null;
      await ctx.db.patch(id, {data});
  },
});
export const getCraft = query({
  args: {
    id: v.id("craft"),
  },
  handler: async (ctx, { id,}) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const userId = identity.subject;
    const craft = await ctx.db.get(id);
    if (!craft || craft.user_id !== userId) return null;
    return craft
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