export async function repairScript(originalCode: string, diagnosis: string): Promise<string> {
  if (diagnosis.toLowerCase().includes('login-button') || originalCode.includes("page.locator('#login-button')")) {
    return originalCode.replace(
      "page.locator('#login-button')",
      "page.getByRole('button', { name: /login|sign in/i })"
    );
  }

  return originalCode;
}
