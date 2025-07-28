  'use server'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

type Props = {
  searchParams?: { w?: string; h?: string }
}

const serverAction = async (w: number, h: number) => {
  // Replace this with actual logic like image resize, whatever
  console.log(`Width: ${w}, Height: ${h}`)
}

const Page = async ({ searchParams }: Props) => {
  const user = await auth()

  const width = parseInt(searchParams?.w || '0')
  const height = parseInt(searchParams?.h || '0')

  if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) {
    // Trigger your server action
    await serverAction(width, height)
  }

  return (
    <div>
      <h1>User ID: {user.userId}</h1>
      <p>
        Got w: {width}, h: {height}
      </p>
    </div>
  )
}

export default Page
