import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import Loader from 'react-loader-spinner';
import pathState, { PathStateEnum } from 'src/state/pathState';
import DisplayHNT from 'components/DisplayHNT';
import { Button } from 'components/Buttons';
import { useFetchAccountActivity, useFetchAccountActivityCount } from 'api/accounts';
import PaymentType from 'components/PaymentType';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 2em 1em 2em;

  button:first-child {
    margin-right: 20px;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 25px 2em 0 2em;
`;

const CenteredSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const sum = (a: any, b: any) => a + b;

const sumTotalActivity = (activities: any) => {
  if (!activities.data) return;

  return Object.values(activities?.data?.data).reduce(sum, 0);
};

const sumDisplayedActivity = (data: any) => {
  return data?.map((p: any) => p.data.length).reduce(sum, 0);
};

const Assets: React.FC = () => {
  const [, setPath] = useRecoilState(pathState);
  // const [transactions, setTransactions] = useRecoilState(transactionState);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useFetchAccountActivity();
  const count = useFetchAccountActivityCount();

  const numPages = data?.pages?.length || 0;
  const totalActivity = sumTotalActivity(count);

  if (hasNextPage && numPages > 2) fetchNextPage();

  const currentTotal = sumDisplayedActivity(data?.pages);

  // useEffect(() => {
  //   data?.pages.forEach(result => {
  //     if (result.data && result.data.length !== 0) {
  //       setTransactions(transactions => [...transactions, result.data]);
  //     }
  //   });
  // }, [data, setTransactions, transactions]);

  return (
    <div>
      <DisplayHNT />
      <Container>
        <Button color="middark" onClick={() => setPath(PathStateEnum.receive)}>
          Receive
        </Button>
        <Button color="purple">Send (coming soon!)</Button>
      </Container>
      <ul>
        {data?.pages.map((page, i) =>
          page?.data?.map((activity: any) => <PaymentType activity={activity} />)
        )}
      </ul>
      <CenteredSpinner>
        {(isFetching || isLoading) && (
          <Loader type="ThreeDots" width={35} height={35} color="#00BFFF" />
        )}
      </CenteredSpinner>
      <Bottom>
        {hasNextPage && (
          <Button color="purple" onClick={() => fetchNextPage()} style={{ width: '200px' }}>
            Load More
          </Button>
        )}
        {currentTotal} of {totalActivity}
      </Bottom>
    </div>
  );
};

export default Assets;
