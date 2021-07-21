import React from 'react';
import QRCode from 'react-qr-code';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { H2 } from 'components/Headers';
import pathState, { PathStateEnum } from 'src/state/pathState';
import addressState from 'src/state/addressState';

const Container = styled.div`
  text-align: center;
`;

const Receive: React.FC = () => {
  const [, setPath] = useRecoilState(pathState);
  const address = useRecoilValue(addressState);

  return (
    <Container>
      <div onClick={() => setPath(PathStateEnum.assets)}>Go back</div>
      <H2>Receive HNT</H2>
      You may receive only HNT at this wallet address
      <QRCode value={address} />
      My Wallet
      {address}
    </Container>
  );
};

export default Receive;
