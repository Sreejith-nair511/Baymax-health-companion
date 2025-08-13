"use client"

import type { ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
