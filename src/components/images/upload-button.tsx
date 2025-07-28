"use client"
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { api } from '../../../convex/_generated/api'
import { useTRPC } from '@/trpc/client'
import { useConvex } from 'convex/react'
import { toast } from 'sonner'
import ImageKit from "imagekit-javascript"
import { Id } from '../../../convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { LoaderCircleIcon } from 'lucide-react'

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
})

type UploadButtonProps = {
  className?: string
  children?: React.ReactNode
  onPendingChild?: React.ReactNode
  onUploadComplete?: (data: {
    _id: Id<"image">
    url: string
    _creationTime: number
    user_id: string
  }) => void
}

const UploadButton = ({
  className,
  children,
  onPendingChild,
  onUploadComplete
}: UploadButtonProps) => {
  const trpc = useTRPC()
  const convex = useConvex()
  const uploadImage = async (files: FileList) => {
    if (!files || files.length === 0) throw new Error("No file selected")
    const file = files[0]

    const auth = await trpc.images.upload.mutate()
    if (!auth) throw new Error("Failed to get ImageKit auth")

    const result = await imagekit.upload({
      file,
      fileName: file.name,
      token: auth.token,
      expire: auth.expire,
      signature: auth.signature,
    })

    if (!result.url || !result.fileId) throw new Error("Image upload failed")

    const data = await convex.mutation(api.images.uploadImage, {
      url: result.url,
      fileId: result.fileId,
      name:file.name
    })

    return data
  }

  const { mutate, isPending } = useMutation({
    mutationFn: uploadImage,
    onError: (err) => {
      toast.error(err.message)
    },
    onSuccess: (data) => {
      onUploadComplete?.(data)
      toast.success("Image uploaded successfully")
    }
  })

  return (
    <label
      htmlFor="file"
      className={cn(
        className,
        isPending && 'opacity-70 cursor-not-allowed',
        'flex items-center'
      )}
    >
      <input
        accept='image/*'
        disabled={isPending}
        type="file"
        name='file'
        id='file'
        onChange={(e) => {
          if (e.target.files && !isPending) {
            mutate(e.target.files)
          }
        }}
        hidden
      />
      {isPending
        ? onPendingChild || <LoaderCircleIcon className="animate-spin w-4 h-4" />
        : children}
    </label>
  )
}

export default UploadButton
