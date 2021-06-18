// @ts-nocheck

import React from 'react';
import { fetchAccount } from 'api/accounts';

const DisplayHNT = () => {
  const { isLoading, error, data } = fetchAccount();

  if (isLoading) return <div>loading</div>;
  if (error) return <div>error</div>;

  if (data) console.log(data);

  return (
    <div>
      <div>address: {data.data.address}</div>
      <div>balance: {data.data.balance}</div>
    </div>
  );
};

export default DisplayHNT;
