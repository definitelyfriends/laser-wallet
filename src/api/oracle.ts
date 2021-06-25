import { useQuery } from 'react-query';
import { fetchAccount } from 'api/accounts';

export const currentOraclePrice = async () => {
  const response = await fetch('https://api.helium.io/v1/oracle/prices/current');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const fetchCurrentPrice = (balance: number) => {
  return useQuery('currentPrice', currentOraclePrice, { enabled: !!balance });
};

// TODO: move to hook
export const fetchPriceAndBalance = () => {
  const { data } = fetchAccount();

  const address = data?.data?.address;
  const balance = data?.data?.balance;

  const priceData = useQuery('currentPrice', currentOraclePrice, { enabled: !!balance });

  const price = priceData?.data?.data?.price;

  return {
    balance,
    address,
    price,
  };
};
