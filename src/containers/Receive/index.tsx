import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { FiChevronLeft } from 'react-icons/fi';
import { MidDark, MidGray } from 'components/Colors';
import { H2 } from 'components/Headers';
import { fetchItem } from 'lib/store';
import pathState, { PathStateEnum } from 'src/state/pathState';

const Container = styled.div`
  padding: 2em 2em 1em 2em;
`;

const BodyContainer = styled.div`
  padding: 0 2em 1em 2em;
`;

const Bubble = styled.div`
  background-color: ${MidDark};
  width: 55px;
  height: 55px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const QRContainer = styled(Bubble)`
  background-color: white;
  width: 160px;
  height: 160px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const StyledH2 = styled(H2)`
  font-weight: 700;
  margin-bottom: 15px;
  margin-top: 20px;
`;

const Address = styled.div`
  margin-top: 25px;
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow-wrap: break-word;

  div:first-child {
    margin-bottom: 15px;
  }
`;

const Title = styled.div`
  margin-left: 10px;
  margin-bottom: 30px;

  div:last-child {
    color: ${MidGray};
  }
`;

const Receive: React.FC = () => {
  const [, setPath] = useRecoilState(pathState);
  const [currentAddress, setCurrentAddress] = useState('');
  const [name, setName] = useState(null);

  useEffect(() => {
    fetchItem('address').then(address => setCurrentAddress(address as any));
    fetchItem('vaults').then(vts => {
      const current = vts.find((item: StoredVault) => item['address'] === currentAddress);

      const name = current?.walletName;

      if (name) {
        setName(name);
      }
    });
  }, [name, currentAddress]);

  return (
    <>
      <Container>
        <Bubble onClick={() => setPath(PathStateEnum.assets)}>
          <FiChevronLeft size="25" />
        </Bubble>
      </Container>
      <BodyContainer>
        <Title>
          <StyledH2>Receive HNT</StyledH2>
          <div>You may receive only HNT at this wallet address</div>
        </Title>
        <QRContainer>
          <QRCode size={130} value={currentAddress} />
        </QRContainer>
        <Address>
          <div>{name || 'My Wallet'}</div>
          <div>{currentAddress}</div>
        </Address>
      </BodyContainer>
    </>
  );
};

export default Receive;
