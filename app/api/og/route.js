import { ImageResponse } from 'next/og'

// Get the OG image for the home page
export async function GET() {

	const response = await fetch('https://www.cambiocup.com/api')
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
					backgroundColor: '#d7263d',
					fontSize: 80,
					letterSpacing: -2,
					fontWeight: 700,
					textAlign: 'center',
				}}
			>
				<div style={{ color: 'white', fontSize: 70 }}>
					Tasa de cambio CUP
				</div>
				<div style={{ color: 'white', display: 'flex', fontSize: 180, fontWeight: 900 }}>
					$ {cup}
				</div>
			</div>
		),
		{ width: 1200, height: 600, }
	)
}