import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {

  const response = await fetch('https://cupusd.vercel.app/api')
  const data = await response.json()
  const { cupHistory } = data
  const cup = cupHistory[0].value.toFixed(2)

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
          fontSize: 80,
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            backgroundImage: 'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
            backgroundClip: 'text', '-webkit-background-clip': 'text',
            color: 'transparent',
            fontSize: 70,
          }}
        >
          Tasa de cambio CUP
        </div>
        <div
          style={{
            backgroundImage: 'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
            backgroundClip: 'text', '-webkit-background-clip': 'text',
            color: 'transparent',
            display: 'flex',
            fontSize: 180,
          }}
        >
          $ {cup}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  )
}