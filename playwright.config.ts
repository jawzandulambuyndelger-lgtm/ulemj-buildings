import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 2,
  reporter: "list",
  timeout: 45000,
  use: {
    baseURL: "http://localhost:3100",
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: [
    {
      command: "npm run start -- --port 3100",
      url: "http://localhost:3100",
      reuseExistingServer: false,
      timeout: 60000,
      env: {
        INQUIRY_DELIVERY_ENABLED: "false",
        NEXT_PUBLIC_SITE_URL: "http://localhost:3100",
      },
    },
    {
      command: "npm run start -- --port 3101",
      url: "http://localhost:3101",
      reuseExistingServer: false,
      timeout: 60000,
      env: {
        INQUIRY_DELIVERY_ENABLED: "true",
        INQUIRY_WEBHOOK_URL: "https://example.invalid/ulemj-test",
        INQUIRY_WEBHOOK_TOKEN: "",
        NEXT_PUBLIC_SITE_URL: "http://localhost:3101",
      },
    },
  ],
});
