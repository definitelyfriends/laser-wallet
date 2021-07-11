import React from 'react';
import styled from 'styled-components';
import DisplayHNT from 'components/DisplayHNT';
import { Button } from 'components/Buttons';
import { useFetchAccountActivity } from 'api/accounts';
import PaymentType from 'components/PaymentType';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 2em 1em 2em;

  button:first-child {
    margin-right: 20px;
  }
`;

const Assets: React.FC = () => {
  const { data, fetchNextPage, hasNextPage } = useFetchAccountActivity();
  const numPages = data?.pages?.length || 0;

  if (hasNextPage && numPages < 6) fetchNextPage();

  return (
    <div>
      <DisplayHNT />
      <Container>
        <Button color="middark">Receive</Button>
        <Button color="purple">Send</Button>
      </Container>
      <ul>
        {data?.pages.map((pages, i) =>
          pages.data.map((activity: any) => <PaymentType activity={activity} />)
        )}
      </ul>
      {hasNextPage && <button onClick={() => fetchNextPage()}>get more</button>}
    </div>
  );
};

export default Assets;
