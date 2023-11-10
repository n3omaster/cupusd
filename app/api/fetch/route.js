import { saveCoinData } from '../db.js'

// How to allow only if the request come from the same domain?
export async function GET(request) {

    const response = await fetch('https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_CUP', {
        headers: {
            'Cache-Control': 'no-cache'
        },
        next: { revalidate: 0 }
    })
    const cupHistory = await response.json()

    const response2 = await fetch('https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_MLC', {
        headers: {
            'Cache-Control': 'no-cache'
        },
        next: { revalidate: 0 }
    })
    const mlcHistory = await response2.json()

    const { cup, mlc } = await saveCoinData(cupHistory.average, mlcHistory.average)

    return Response.json({ cup, mlc })
}