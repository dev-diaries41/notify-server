"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChannel = exports.sendNotification = exports.notify = void 0;
const notify_1 = require("./utils/notify");
const notifications_1 = require("../constants/notifications");
exports.notify = new notify_1.Notify(notifications_1.NOTIFICATIONS_CONFIG);
async function sendNotification(message, platform = '') {
    switch (platform) {
        case 'TELEGRAM':
            return await exports.notify.telegram(message);
        case 'DISCORD':
            return await exports.notify.discord(message);
        default:
            return await exports.notify.all(message);
    }
}
exports.sendNotification = sendNotification;
// In this discord case the newChannel is a webhook url
// In telegram case the newChannel is @channelId or chatId number
function updateChannel(newChannel, platform) {
    switch (platform) {
        case 'TELEGRAM':
            return exports.notify.updateTelegramChannelId(newChannel);
        case 'DISCORD':
            return exports.notify.updateDiscordWebhookUrl(newChannel);
        default:
    }
}
exports.updateChannel = updateChannel;
