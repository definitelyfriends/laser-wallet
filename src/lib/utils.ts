export const truncateAddress = (address: string | null): string => {
  if (address == null) return '';

  const beginning = address.slice(0, 8);
  const end = address.slice(-5);

  return `${beginning}...${end}`;
};
