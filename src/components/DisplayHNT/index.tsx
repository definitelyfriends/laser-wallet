// @ts-nocheck

import React from 'react';
import { fetchPriceAndBalance } from 'api/oracle';

const DisplayHNT = () => {
  const { balance, address, price } = fetchPriceAndBalance();

  return (
    <div>
      <div>address: {address}</div>
      <div>balance: {balance}</div>
      <div>price: {price}</div>
    </div>
  );
};

export default DisplayHNT;
