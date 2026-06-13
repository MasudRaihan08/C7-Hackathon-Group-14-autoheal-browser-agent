type GenerateScriptInput = {
  baseUrl: string;
  flowName: string;
  steps: string[];
};

export async function generateScriptForFlow(input: GenerateScriptInput): Promise<string> {
  const safeName = input.flowName.replace(/[^a-zA-Z0-9 ]/g, '');

  if (/login/i.test(input.flowName)) {
    return `import { test, expect } from '@playwright/test';

test('${safeName}', async ({ page }) => {
  await page.goto('${input.baseUrl}');

  // Intentionally starts with a brittle selector to demonstrate auto-healing.
  await page.locator('#login-button').click();

  await page.getByLabel(/email/i).fill('demo@example.com');
  await page.getByLabel(/password/i).fill('password123');
  await page.getByRole('button', { name: /submit|login|sign in/i }).click();

  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});
`;
  }

  return `import { test, expect } from '@playwright/test';

test('${safeName}', async ({ page }) => {
  await page.goto('${input.baseUrl}');
  await page.getByRole('textbox', { name: /search/i }).fill('browser automation');
  await page.keyboard.press('Enter');
  await expect(page.getByText(/results/i)).toBeVisible();
});
`;
}
