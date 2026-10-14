// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 90000,

  expect: { timeout: 10000 },

  fullyParallel: false,   
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  workers: 1,

  reporter: 'html',
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    trace: 'on-first-retry',
    locale: 'en-US',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});