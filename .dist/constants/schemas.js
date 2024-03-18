"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFY_SCHEMA = void 0;
const zod_1 = require("zod");
// Define the NotifyConfig schema with all objects optional
exports.NOTIFY_SCHEMA = zod_1.z.object({
    telegramConfig: zod_1.z.object({
        token: zod_1.z.string(),
        options: zod_1.z.object({
            polling: zod_1.z.boolean().optional(),
        }).optional(),
        telegramChannelId: zod_1.z.string(),
    }).refine((data) => (data.token && data.telegramChannelId), {
        message: 'Invalid telegramConfig.  Token and telegramChannelId required.',
        path: ['telegramConfig'],
    }),
    discordConfig: zod_1.z.object({
        webhookUrl: zod_1.z.string(),
    }).optional(),
}).refine((data) => !!data.telegramConfig || !!data.discordConfig, {
    message: 'At least one of emailConfig, telegramConfig, or discordConfig must be provided.',
});
