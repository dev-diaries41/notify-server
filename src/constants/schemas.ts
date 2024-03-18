import { z } from 'zod';

// Define the NotifyConfig schema with all objects optional
export const NOTIFY_SCHEMA = z.object({
    telegramConfig: z.object({
      token: z.string(),
      options: z.object({
        polling: z.boolean().optional(),
      }).optional(),
      telegramChannelId: z.string(),
    }).refine((data: any) => (data.token && data.telegramChannelId), {
      message: 'Invalid telegramConfig.  Token and telegramChannelId required.',
      path: ['telegramConfig'],
    }),
    discordConfig: z.object({
      webhookUrl: z.string(),
    }).optional(),
  }).refine((data: any) =>  !!data.telegramConfig || !!data.discordConfig, {
    message: 'At least one of emailConfig, telegramConfig, or discordConfig must be provided.',
  });

 

