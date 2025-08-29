import { getCoinData } from './db.js'
import { NextResponse } from 'next/server'

// Get the data for the home page
export async function GET() {
    const { cupHistory, mlcHistory, clasicaHistory } = await getCoinData()
    return NextResponse.json({ cupHistory, mlcHistory, clasicaHistory }, { next: { revalidate: 60 * 60 } })
}

export const revalidate = 60 * 60