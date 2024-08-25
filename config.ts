export const config = {
  server: {
    host: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  slack: {
    monitorUrl: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL,
  },
};
