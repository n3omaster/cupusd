
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

const getCoinData = async () => {

    const { data: cupHistory, error: cupError } = await supabase
        .from('exchange')
        .select()
        .eq('coin_id', 1)
        .order('updated_at', { ascending: false })
        .limit(48)

    const { data: mlcHistory, error: mlcError } = await supabase
        .from('exchange')
        .select()
        .eq('coin_id', 2)
        .order('updated_at', { ascending: false })
        .limit(48)

    return { cupHistory, mlcHistory }
}

const saveCoinData = async (cupValue, mlcValue) => {

    const { data: rspCup, error: cupError } = await supabase
        .from('exchange')
        .insert({ coin_id: 1, value: cupValue })
        .select()
    const cup = rspCup[0]

    const { data: rspMlc, error: mlcError } = await supabase
        .from('exchange')
        .insert({ coin_id: 2, value: mlcValue })
        .select()
    const mlc = rspMlc[0]

    return { cup, mlc }
}

export { getCoinData, saveCoinData }