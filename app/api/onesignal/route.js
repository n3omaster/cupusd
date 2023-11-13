// Daily Onesignal push notification
import { NextResponse } from 'next/server';
import * as OneSignal from '@onesignal/node-onesignal';

export async function GET(request) {

    const ONESIGNAL_APP_ID = '04dffeef-fbcd-4c21-95fc-eb358400eff2';
    const ONESIGNAL_API_KEY = 'NDlmZTJjZGEtMmFiNS00N2RlLWEzMjctMzRhZWM4MjgwMTRm';

    const app_key_provider = {
        getToken() {
            return ONESIGNAL_API_KEY;
        }
    };

    const configuration = OneSignal.createConfiguration({
        authMethods: {
            app_key: {
                tokenProvider: app_key_provider
            }
        }
    });
    const client = new OneSignal.DefaultApi(configuration);

    const notification = new OneSignal.Notification();
    notification.app_id = ONESIGNAL_APP_ID;
    notification.included_segments = ['Subscribed Users'];
    notification.name = 'Sigue el mercado monetario en CambioCUP.com 👌';
    notification.url = 'https://www.cambiocup.com';
    notification.contents = {
        en: "Estamos en $267.12 (CUP) y $1.11 (MLC). Sigue la tendencia de los precios del CUP y MLC en CambioCUP.com 👌"
    };
    notification.headings = {
        en: "Sigue la tendencia de los precios del CUP y MLC en CambioCUP.com 👌"
    };
    const { id, errors, recipients } = await client.createNotification(notification);

    return NextResponse.json({ notification, client, id, errors, recipients })
}

export const revalidate = 0; 