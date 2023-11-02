import { getCoinData } from './db.js';

// How to allow only if the request come from the same domain?
export async function GET(request) {
    const { cupHistory, mlcHistory } = await getCoinData();
    return Response.json({ cupHistory, mlcHistory })
}