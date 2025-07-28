"use client"

import React from 'react'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ClerkProvider, useAuth } from '@clerk/clerk-react'


if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const ConvexClerkClient = ({ children }: { children: React.ReactNode }) => {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

  return (
  <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
     <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    {children}
   </ConvexProviderWithClerk>
  </ClerkProvider>
  )
}

export default ConvexClerkClient