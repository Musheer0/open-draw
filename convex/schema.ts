
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    image : defineTable({
        user_id:v.string(),
        url:v.string(),
        file_id:v.string(),
        name:v.optional(v.string())
    }),
    craf:defineTable({
        name: v.string(),
        user_id:v.string(),
        width:v.number(),
        height:v.number(),
        
    })
})
