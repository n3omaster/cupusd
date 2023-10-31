import { Barlow } from 'next/font/google'
import './globals.css'

const barlow = Barlow({ weight: ['100', '500', '700', '800', '900'], subsets: ['latin'] })

export const metadata = {
  title: 'Tasa de cambio CUP y MLC de Cuba en tiempo real',
  description: 'Obtén la tasa de cambio CUP y MLC de Cuba en tiempo real',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={barlow.className}>{children}</body>
    </html>
  )
}
