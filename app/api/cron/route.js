import { NextResponse } from 'next/server';
import { saveCoinData } from '../db.js'

export async function GET() {
    const response = await fetch('https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_CUP', {
        headers: {
            'Cache-Control': 'no-cache'
        },
        cache: 'no-store',
        next: { revalidate: 0 }
    })
    const cupHistory = await response.json()

    const response2 = await fetch('https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_MLC', {
        headers: {
            'Cache-Control': 'no-cache'
        },
        cache: 'no-store',
        next: { revalidate: 0 }
    })
    const mlcHistory = await response2.json()

    const { cup, mlc } = await saveCoinData(cupHistory.average, mlcHistory.average)

    return NextResponse.json({ cup, mlc })
}

export const fetchCache = 'force-no-store';