import { Barlow } from 'next/font/google'
import './globals.css'

const barlow = Barlow({ weight: ['500', '800', '900'], subsets: ['latin'] })

export const metadata = {
  title: 'Tasa de cambio CUP y MLC de Cuba en tiempo real',
  description: 'Obtén la tasa de cambio CUP y MLC de Cuba en tiempo real',
  keywords: ['Cambio CUP', 'Tasa CUP USD', 'Cambio CUP Cuba'],
  creator: 'Erich Garcia Cruz',
  openGraph: {
    title: 'Tasa de cambio CUP y MLC de Cuba en tiempo real',
    description: 'Obtén la tasa de cambio CUP y MLC de Cuba en tiempo real',
    url: 'https://www.cambiocup.com',
    siteName: 'CAMBIO CUP',
    images: [
      {
        url: 'https://www.cambiocup.com/api/og',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={barlow.className}>{children}</body>
    </html>
  )
}
