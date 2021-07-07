import React from 'react';
import DisplayHNT from 'components/DisplayHNT';
import { useFetchAccountActivity } from 'api/accounts';
import PaymentType from 'components/PaymentType';

const Assets: React.FC = () => {
  const { data, fetchNextPage, hasNextPage } = useFetchAccountActivity();
  const numPages = data?.pages?.length || 0;

  if (hasNextPage && numPages < 6) fetchNextPage();

  return (
    <div>
      <DisplayHNT />
      {data?.pages.map((pages, i) => (
        <React.Fragment key={i}>
          {pages.data.map((activity: any) => (
            <PaymentType activity={activity} />
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && <button onClick={() => fetchNextPage()}>get more</button>}
    </div>
  );
};

export default Assets;
