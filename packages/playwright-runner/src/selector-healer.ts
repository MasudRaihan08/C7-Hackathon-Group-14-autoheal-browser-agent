export type SelectorRepairInput = {
  code: string;
  failingSelector: string;
  replacementText?: string;
};

export function basicSelectorRepair(input: SelectorRepairInput): string {
  const { code, failingSelector, replacementText } = input;
  if (!replacementText) return code;

  const escaped = failingSelector.replace(/[.*+?^${}()|[\]\]/g, '\$&');
  const roleLocator = `page.getByRole('button', { name: /${replacementText}/i })`;

  return code.replace(new RegExp(`page\.locator\(['"]${escaped}['"]\)`, 'g'), roleLocator);
}
