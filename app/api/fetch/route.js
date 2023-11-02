import { saveCoinData } from '../db.js'

// How to allow only if the request come from the same domain?
export async function GET(request) {

    // Retirve data from 
    // https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_CUP and https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_MLC
    const response = await fetch('https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_CUP')
    const cupHistory = await response.json()

    const response2 = await fetch('https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_MLC')
    const mlcHistory = await response2.json()

    // Now save this into DB with prisma
    const { cup, mlc } = await saveCoinData(cupHistory.average, mlcHistory.average)

    return Response.json({ cup, mlc })
}