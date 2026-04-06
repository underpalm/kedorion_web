import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopBar from '@/components/TopBar'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'KEDORION',
  icons: {
    icon: '/kedorion.svg',
    apple: '/kedorion.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-[#111]`}>
        <TopBar />
        <div className="flex flex-col min-h-screen pt-[33px]">
          {children}
        </div>
      </body>
    </html>
  )
}
