import type { Diagnosis } from '@autoheal/shared';

export async function diagnoseFailure(errorText: string): Promise<Diagnosis> {
  if (errorText.includes('#login-button') || errorText.toLowerCase().includes('locator')) {
    return {
      failureType: 'broken_selector',
      rootCause: 'The selector #login-button could not be found. The UI may have changed from Login to Sign in.',
      confidence: 0.9,
      suggestedFix: "Use page.getByRole('button', { name: /login|sign in/i }) instead of page.locator('#login-button').",
      repairStrategy: 'Replace brittle CSS selector with semantic role-based locator.'
    };
  }

  if (errorText.toLowerCase().includes('timeout')) {
    return {
      failureType: 'timeout',
      rootCause: 'The page or element took too long to become ready.',
      confidence: 0.72,
      suggestedFix: 'Use web-first assertions and wait for navigation/load state.',
      repairStrategy: 'Replace fixed waits with Playwright locators and assertions.'
    };
  }

  return {
    failureType: 'unknown',
    rootCause: 'The failure could not be confidently classified.',
    confidence: 0.4,
    suggestedFix: 'Inspect trace, screenshot, and console logs.',
    repairStrategy: 'Manual review recommended.'
  };
}
