'use client'
import { SessionProvider } from "next-auth/react";

export default function MasterProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider session={undefined}>
      {children}
    </SessionProvider>
  )
}