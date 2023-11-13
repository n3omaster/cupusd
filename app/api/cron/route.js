import { NextResponse } from 'next/server';
import { saveCoinData } from '../db.js'
const { signal } = new AbortController()

export async function GET() {
    const response = await fetch('https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_CUP', {
        headers: {
            'Cache-Control': 'no-cache'
        },
        next: { revalidate: 0 }.
        signal
    })
    const cupHistory = await response.json()

    const response2 = await fetch('https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_MLC', {
        headers: {
            'Cache-Control': 'no-cache'
        },
        next: { revalidate: 0 },
        signal
    })
    const mlcHistory = await response2.json()

    const { cup, mlc } = await saveCoinData(cupHistory.average, mlcHistory.average)

    const randomNumber = Math.random() * 1000

    return NextResponse.json({ cup, mlc, randomNumber })
}

export const fetchCache = 'force-no-store';