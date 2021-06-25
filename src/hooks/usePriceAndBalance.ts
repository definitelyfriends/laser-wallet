import { useQuery } from 'react-query';
import { fetchAccount } from 'api/accounts';
import { currentOraclePrice } from 'api/oracle';
import { calculateTotal, centsToDollars } from 'lib/money';

export const usePriceAndBalance = () => {
  const { data } = fetchAccount();

  const address = data?.data?.address;
  const balance = data?.data?.balance;

  const currentPrice = useQuery('currentPrice', currentOraclePrice, { enabled: !!balance });

  const price = currentPrice?.data?.data?.price;
  const normalizedBalance = balance / 100000000;
  const value = centsToDollars(normalizedBalance * calculateTotal(price));

  return {
    balance,
    normalizedBalance,
    address,
    price,
    value
  };
};
