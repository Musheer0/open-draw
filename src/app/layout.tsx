import type { Metadata } from "next";
import {Host_Grotesk} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ConvexClerkClient from "@/components/providers/convex-clerk-provider";
import { TRPCProvider } from "@/trpc/client";
import { Toaster } from "sonner";
const font = Host_Grotesk({
  subsets:['latin-ext','latin']
})

export const metadata: Metadata = {
  title: "Open Draw App",
  description: "Fast AF graphic design tool",
  openGraph: {
    title: "Open Draw App",
    description: "Fast AF graphic design tool",
    url: "https://open-draw.vercel.app",
    siteName: "Open Draw",
    images: [
      {
        url: "https://open-draw.vercel.app/og.png", 
        width: 1200,
        height: 630,
        alt: "Open Draw App OG Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Draw App",
    description: "Fast AF graphic design tool",
    images: ["https://open-draw.vercel.app/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<ConvexClerkClient>
    <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fira+Code:wght@400;700&family=Inter:wght@400;700&family=JetBrains+Mono:wght@400;700&family=Manrope:wght@400;700&family=Montserrat:wght@400;700&family=Open+Sans:wght@400;700&family=Poppins:wght@400;700&family=Raleway:wght@400;700&family=Roboto:wght@400;700&family=Space+Grotesk:wght@400;700&family=Ubuntu:wght@400;700&display=swap" rel="stylesheet"/>
      </head>
      <body
      suppressContentEditableWarning suppressHydrationWarning
        className={`${font.className} antialiased`}
      >   <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <TRPCProvider>
          <Toaster richColors/>
          {children}
        </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
    </ConvexClerkClient>
  );
}
