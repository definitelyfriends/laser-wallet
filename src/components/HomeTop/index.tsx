import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import { useAddress } from 'hooks/useAddress';
import { truncateAddress } from 'lib/utils';

const Top = styled.header`
  width: 100%;
  background-color: #1f2436;
  color: #ffffff;
  height: 83px;
`;

const HomeTop: React.FC = () => {
  const [address, setAddress] = useState<string>('');

  useAddress().then(walletAddress => setAddress(truncateAddress(walletAddress)));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Top>
        <div>Wallet Name</div>
        {address}
      </Top>
    </Suspense>
  );
};

export default HomeTop;
