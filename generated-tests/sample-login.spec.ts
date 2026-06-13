import { test, expect } from '@playwright/test';

test('sample login flow', async ({ page }) => {
  await page.goto(process.env.DEMO_SITE_URL || 'http://localhost:5000');
  await page.getByRole('button', { name: /login|sign in/i }).click();
  await page.getByLabel(/email/i).fill('demo@example.com');
  await page.getByLabel(/password/i).fill('password123');
  await page.getByRole('button', { name: /submit/i }).click();
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});
