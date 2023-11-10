import { getCoinData } from './db.js';

// How to allow only if the request come from the same domain?
export async function GET(request) {
    const { cupHistory, mlcHistory } = await getCoinData();
    const headers = {
        'Cache-Control': 'no-cache, no-store'
    };
    return new Response(JSON.stringify({ cupHistory, mlcHistory }), { headers, next: { revalidate: 10 } });
}