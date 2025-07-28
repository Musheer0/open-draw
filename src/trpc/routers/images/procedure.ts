import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { auth } from "@clerk/nextjs/server";
import ImageKit from "imagekit";
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!, // like https://ik.imagekit.io/yourid
});
export const ImageRouter = createTRPCRouter({
    upload: baseProcedure
    .mutation(async()=>{
        const user = await auth();
        if (!user.userId) throw new Error("Unauthenticated");
        const authparams =await imagekit.getAuthenticationParameters();
        return authparams
    })
})