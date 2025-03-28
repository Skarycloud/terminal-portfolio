import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

// Update the metadata to reflect the correct information

export const metadata: Metadata = {
  title: "Sumanth Kumar | Frontend Developer | React | AI & ML",
  description:
    "Portfolio of Sumanth Kumar, a Frontend Developer from Mangalore specializing in React.js and AI-driven development",
    generator: 'v0.dev'
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



import './globals.css'