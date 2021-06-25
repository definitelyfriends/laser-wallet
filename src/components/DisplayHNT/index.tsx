// @ts-nocheck

import React from 'react';
import { usePriceAndBalance } from 'hooks/usePriceAndBalance';

const DisplayHNT = () => {
  const { normalizedBalance, address, price, value } = usePriceAndBalance();

  return (
    <div>
      <div>address: {address}</div>
      <div>balance: {normalizedBalance}</div>
      <div>current price: {price}</div>
      <div>value: {value}</div>
    </div>
  );
};

export default DisplayHNT;
