import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Design Playground',
  description: 'Interactive drag-and-drop design playground for creating layouts and designs',
  icons: {
    icon: '/design-playground-icon.svg',
    apple: '/design-playground-icon.svg',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
