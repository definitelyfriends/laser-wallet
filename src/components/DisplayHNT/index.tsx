import React from 'react';
import styled from 'styled-components';
import { H1 } from 'components/Headers';
import { usePriceAndBalance } from 'hooks/usePriceAndBalance';

const Container = styled.div`
  background-color: #1f2436;
  color: #ffffff;
  padding: 2em;
`;

const Value = styled(H1)`
  font-weight: 400;
`;

const Balance = styled.div`
  color: #767991;
  font-size: 13px;
`;

const DisplayHNT = () => {
  const { normalizedBalance, normalizedPrice } = usePriceAndBalance();

  return (
    <Container>
      <Value>{normalizedBalance} HNT</Value>
      <Balance>{normalizedPrice} USD</Balance>
    </Container>
  );
};

export default DisplayHNT;
