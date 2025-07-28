import { auth } from '@clerk/nextjs/server'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const user = await auth()
  const resolvedParams = await searchParams

  const wRaw = resolvedParams?.w
  const hRaw = resolvedParams?.h

  const width = parseInt(Array.isArray(wRaw) ? wRaw[0] : wRaw || '0')
  const height = parseInt(Array.isArray(hRaw) ? hRaw[0] : hRaw || '0')

  if (width > 0 && height > 0) {
    await doStuff(width, height)
  }

  return (
    <div>
      <p>User ID: {user.userId}</p>
      <p>w: {width}, h: {height}</p>
    </div>
  )
}

async function doStuff(w: number, h: number) {
  console.log('Triggered:', w, h)
}
