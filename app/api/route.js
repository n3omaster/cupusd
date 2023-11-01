import { getCoinData } from './db.js';

export async function GET(request) {
    const { cupHistory, mlcHistory } = await getCoinData();
    return Response.json({ cupHistory, mlcHistory })
}