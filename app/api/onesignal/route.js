import { NextResponse } from 'next/server';
// import * as OneSignal from '@onesignal/node-onesignal';
const sdk = require('api')('@onesignal/v11.0#7g0slo7voi53');

export async function GET(request) {

    const ONESIGNAL_APP_ID = '04dffeef-fbcd-4c21-95fc-eb358400eff2';
    const ONESIGNAL_API_KEY = 'NDlmZTJjZGEtMmFiNS00N2RlLWEzMjctMzRhZWM4MjgwMTRm';

    sdk.createNotification({
        app_id: ONESIGNAL_APP_ID,
        included_segments: ['Subscribed Users'],
        // external_id: 'string',
        contents: {
            en: 'We are at $267.12 (CUP) and $1.11 (MLC). Follow the trend of CUP and MLC prices at CambioCUP.com 👌',
            es: 'Estamos en $267.12 (CUP) y $1.11 (MLC). Sigue la tendencia de los precios del CUP y MLC en CambioCUP.com 👌'
        },
        name: 'DAILY_RATE',
        // send_after: 'string',
        delayed_option: 'timezone',
        delivery_time_of_day: '9:00AM',
        throttle_rate_per_minute: 0,
        // custom_data: 'string'
    }, {
        authorization: 'Basic ' + ONESIGNAL_API_KEY
    })
        .then(({ data }) => console.log("DATA:", data))
        .catch(err => console.error("ERR:", err));

    return NextResponse.json({ sdk })
}

export const revalidate = 0; 