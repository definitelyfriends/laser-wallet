import React from 'react';
import styled from 'styled-components';
import { H1 } from 'components/Headers';
import { MidGray } from 'components/Colors';
import { usePriceAndBalance } from 'hooks/usePriceAndBalance';

const Container = styled.div`
  background-color: #1f2436;
  color: #ffffff;
  padding: 2em;
`;

const HNTContainer = styled.div`
  display: flex;
`;

const Decimal = styled.div`
  margin-left: 0.575em;
  font-size: 12px;
  color: ${MidGray};
  align-self: center;
`;

const Balance = styled(H1)`
  font-weight: 400;
`;

const Value = styled.div`
  color: #767991;
  font-size: 13px;
  margin-top: 10px;
`;

const DisplayHNT = () => {
  const { absoluteBalance, balanceDecimalToPrecision, value } = usePriceAndBalance();

  const decimalWithoutPrefix = balanceDecimalToPrecision.split('.')[1];

  return (
    <Container>
      <HNTContainer>
        <Balance>{absoluteBalance || '0'}</Balance>
        <Decimal>
          <div>HNT</div>
          <div>.{decimalWithoutPrefix || '00'}</div>
        </Decimal>
      </HNTContainer>
      <Value>{value || '0.00'} USD</Value>
    </Container>
  );
};

export default DisplayHNT;
