import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

const title = "Sumanth Kumar — Full-stack Developer & AI Product Builder"
const description =
  "Sumanth Kumar is a full-stack developer and AI product builder specializing in React, Next.js, React Native, Expo, UI/UX, and AI-powered applications."

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Sumanth Kumar", url: "https://github.com/Skarycloud" }],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
    siteName: "Sumanth Kumar — Terminal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@SumanthKum75525",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
