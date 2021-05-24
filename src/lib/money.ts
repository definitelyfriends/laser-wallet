export const centsToDollars = (cents: number) => {
  const dollars = cents / 100000000;

  return dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
