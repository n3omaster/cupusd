import { getCoinData } from './db.js'

export async function GET(request) {
    const { cupHistory, mlcHistory } = await getCoinData();
    const headers = {
        'Cache-Control': 'no-cache, no-store'
    };
    return new Response(JSON.stringify({ cupHistory, mlcHistory }), { headers, next: { revalidate: 0 } });
}

export const revalidate = 60; 