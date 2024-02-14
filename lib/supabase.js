
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

const saveCoinData = async (cup, mlc) => {
    const { data: rspCup, error: cupError } = await supabase
        .from('exchange')
        .insert([{ coin_id: 1, value: cup }])

    const { data: rspMlc, error: mlcError } = await supabase
        .from('exchange')
        .insert([{ coin_id: 2, value: mlc }])

    return { rspCup, rspMlc }
}

export { getCoinData, saveCoinData }