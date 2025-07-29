"use client"
import { useTRPC } from "@/trpc/client"
import ImageKit from "imagekit-javascript"


const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
})


export const useImageUpload = () => {
  const trpc = useTRPC()

  return  async (file:File) => {
      if (!file) throw new Error("No file provided")

      const MAX_SIZE_MB = 5
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        throw new Error("Bruh, file too big. Max allowed is 5MB.")
      }

      const auth = await trpc.images.upload.mutate()
      if (!auth) throw new Error("Failed to get ImageKit auth")

      const result = await imagekit.upload({
        file,
        fileName: file.name,
        token: auth.token,
        expire: auth.expire,
        signature: auth.signature,
        overwriteFile:true
      })

      if (!result.url || !result.fileId) throw new Error("Image upload failed")

      return result.url
    }
}
