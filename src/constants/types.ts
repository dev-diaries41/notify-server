
export interface NotifyConfig {
    telegramConfig: {
      token: string;
      options: { polling?: boolean };
      telegramChannelId: string;
    };
    discordConfig?: {
      webhookUrl: string;
    };
  }