const baseUrl = 'https://api.helium.io/v1';
const accounts = `${baseUrl}/accounts`;

export const fetchAccount = async (address: string) => {
  const response = await fetch(`${accounts}/${address}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
