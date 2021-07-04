import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Identicon from 'react-identicons';
import { FiMenu } from 'react-icons/fi';
import { H4 } from 'components/Headers';
import { useAddress } from 'hooks/useAddress';
import { truncateAddress } from 'lib/utils';

const Top = styled.header`
  width: 100%;
  background-color: #1f2436;
  color: #ffffff;
  height: 83px;
  display: flex;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2em;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2em;
  flex: 1;
  justify-content: flex-end;
`;

const WalletInfo = styled.div`
  flex: 1;
  margin-left: 15px;
`;

const HomeTop: React.FC = () => {
  const [address, setAddress] = useState<string>('');

  useAddress().then(walletAddress => setAddress(truncateAddress(walletAddress)));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Top>
        <Left>
          <Identicon string={address} size={32} />
          <WalletInfo>
            <H4>Wallet Name</H4>
            {address}
          </WalletInfo>
        </Left>
        <Right>
          <FiMenu size="24px" />
        </Right>
      </Top>
    </Suspense>
  );
};

export default HomeTop;
