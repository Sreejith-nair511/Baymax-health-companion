import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Providers } from "./providers"
import ChatButton from "@/components/chat-button"
import { Toaster } from "@/components/ui/toaster"
import LoadingAnimation from "@/components/loading-animation"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
})

export const metadata: Metadata = {
  title: "Baymax - Your Personal Healthcare Companion",
  description: "A Baymax-inspired healthcare assistant to help you stay healthy and happy.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.className} min-h-screen flex flex-col`}>
        <Providers>
          <LoadingAnimation />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <ChatButton />
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
