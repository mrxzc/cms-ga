import '@assets/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import Container from '@components/organisms/Container'

const inter = DM_Sans({ subsets: ['latin'] })
export const viewport: Viewport = {
  themeColor: '#ffff',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  userScalable: true,
}

export const metadata: Metadata = {
  title: {
    default: 'Home | BEFAST',
    template: '%s | BEFAST',
  },
  description: 'Get Result and Performance HC',
  manifest: '/manifest.json',
  icons: [{ url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>{children}</Container>
      </body>
    </html>
  )
}
