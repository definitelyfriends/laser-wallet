import React from 'react';
import styled from 'styled-components';
import { H1 } from 'components/Headers';
import { usePriceAndBalance } from 'hooks/usePriceAndBalance';

const Container = styled.div`
  background-color: #272b4a;
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
  const { normalizedBalance, address, normalizedPrice, value } = usePriceAndBalance();

  return (
    <Container>
      <Value>{normalizedPrice} USD</Value>
      <Balance>{normalizedBalance} HNT</Balance>
    </Container>
  );
};

export default DisplayHNT;
