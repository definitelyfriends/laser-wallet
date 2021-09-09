import { useQuery } from 'react-query';
import { useFetchAccount } from 'api/accounts';
import { currentOraclePrice } from 'api/oracle';
import { calculateTotal, centsToDollars } from 'lib/money';

interface Balances {
  balance: string;
  normalizedBalance: number;
  normalizedPrice: string;
  address: string;
  price: string;
  value: string;
  absoluteBalance: number;
  balanceDecimalToPrecision: string;
}

export const usePriceAndBalance = (): Balances => {
  const { data } = useFetchAccount();

  const address = data?.data?.address;
  const balance = data?.data?.balance;

  const oracleCurrentPrice = useQuery('currentPrice', currentOraclePrice, {
    enabled: !!balance,
    refetchOnWindowFocus: false,
  });

  const price = oracleCurrentPrice?.data?.data?.price;
  const normalizedBalance = balance / 100000000;
  const normalizedPrice = centsToDollars(calculateTotal(price));
  const value = centsToDollars(normalizedBalance * calculateTotal(price));

  const absoluteBalance = Math.floor(Number(normalizedBalance));
  const balanceDecimal = Number(normalizedBalance) % 1;
  const balanceDecimalToPrecision = balanceDecimal.toPrecision(7);

  return {
    balance,
    normalizedBalance,
    normalizedPrice,
    address,
    price,
    value,
    absoluteBalance,
    balanceDecimalToPrecision,
  };
};
