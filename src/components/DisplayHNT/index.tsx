// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { fetchItem } from 'lib/store';
import { fetchAccount } from 'api/accounts';

const DisplayHNT = () => {
  const [address, setAddress] = useState('');
  const [account, setAccount] = useState({});

  async function getAddress() {
    const address = await fetchItem('address');
    setAddress(address);
  }

  useEffect(() => {
    getAddress();
  }, []);

  const { isLoading, error, data } = fetchAccount(address);

  if (isLoading) console.log('loading');
  if (error) console.log('error');

  if (data) console.log(data);

  // if (data) setAddress(data);

  return <div>{address}</div>;
};

export default DisplayHNT;
