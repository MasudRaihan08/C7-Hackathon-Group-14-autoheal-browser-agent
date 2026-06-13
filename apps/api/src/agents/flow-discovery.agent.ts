import type { DiscoveredFlow } from '@autoheal/shared';

export async function discoverFlows(baseUrl: string): Promise<DiscoveredFlow[]> {
  // Hackathon MVP: deterministic discovery for demo reliability.
  // Later: inspect DOM with Playwright and pass page summary to an LLM.
  return [
    {
      name: 'Login Flow',
      description: 'User logs in and reaches dashboard.',
      priority: 'high',
      steps: [
        `Open ${baseUrl}`,
        'Click Login or Sign in',
        'Enter email',
        'Enter password',
        'Submit form',
        'Verify dashboard is visible'
      ]
    },
    {
      name: 'Search Flow',
      description: 'User searches for a product or article.',
      priority: 'medium',
      steps: [
        `Open ${baseUrl}`,
        'Find search input',
        'Enter search keyword',
        'Submit search',
        'Verify results are visible'
      ]
    }
  ];
}
