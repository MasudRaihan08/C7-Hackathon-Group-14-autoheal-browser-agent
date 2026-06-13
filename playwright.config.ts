import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './generated-tests',
  timeout: 30_000,
  retries: 1,
  reporter: [['html'], ['list']],
  use: {
    baseURL: process.env.DEMO_SITE_URL || 'http://localhost:5000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
