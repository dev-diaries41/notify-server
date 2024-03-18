import { Notify } from "./utils/notify";
import { NOTIFICATIONS_CONFIG } from "../constants/notifications";

export const notify = new Notify(NOTIFICATIONS_CONFIG)
export async function sendNotification(message: string, platform=''){
    switch(platform){
        case 'TELEGRAM':
            return await notify.telegram(message);
        case 'DISCORD':
            return await notify.discord(message);
        default:
            return await notify.all(message);
    }
}

// In this discord case the newChannel is a webhook url
// In telegram case the newChannel is @channelId or chatId number
export function updateChannel(newChannel:string, platform:string){
    switch(platform){
        case 'TELEGRAM':
            return notify.updateTelegramChannelId(newChannel);
        case 'DISCORD':
            return  notify.updateDiscordWebhookUrl(newChannel);
        default:
    }
}