import { saveCoinData } from '../db.js'

// How to allow only if the request come from the same domain?
export async function GET(request) {

    const response = await fetch('https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_CUP', {
        headers: {
            'Cache-Control': 'no-cache'
        },
        next: { revalidate: 10 }
    })
    const cupHistory = await response.json()

    const response2 = await fetch('https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_MLC', {
        headers: {
            'Cache-Control': 'no-cache'
        },
        next: { revalidate: 10 }
    })
    const mlcHistory = await response2.json()

    console.log('CUP History Average:', cupHistory.average);
    console.log('MLC History Average:', mlcHistory.average);

    const { cup, mlc } = await saveCoinData(cupHistory.average, mlcHistory.average)

    console.log('Saved CUP Value:', cup);
    console.log('Saved MLC Value:', mlc);

    return Response.json({ cup, mlc })
}