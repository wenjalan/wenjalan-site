import type { Metadata } from 'next'
import './globals.css'
import MasterProvider from './components/MasterProvider'

export const metadata: Metadata = {
  title: 'Alan Wen',
  description: 'We were so preoccupied with whether or not we could, we didn\'t stop to think if we should.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-slate-900'>
        <MasterProvider>
          {children}
        </MasterProvider>
      </body>
    </html>
  )
}
