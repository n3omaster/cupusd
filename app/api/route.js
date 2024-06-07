import { getCoinData } from '@/lib/supabase'

export async function GET(request) {
    const { cupHistory, mlcHistory } = await getCoinData()
    const headers = { 'Cache-Control': 'no-cache, no-store' }
    return new Response(JSON.stringify({ cupHistory, mlcHistory }), { headers, next: { revalidate: 5 * 60 } })
}

export const revalidate = 5 * 60