import { useQuery } from 'react-query';

const fetchCurrentPrice = () => {
  return useQuery('currentPrice', async () => {
    const response = await fetch('https://api.helium.io/v1/oracle/prices/current');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  });
};
