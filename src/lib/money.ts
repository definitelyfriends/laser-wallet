export const calculateTotal = (cents: number): number => cents / 100000000;
export const centsToDollars = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
