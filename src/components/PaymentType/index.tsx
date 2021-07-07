import React from 'react';
import { useRecoilValue } from 'recoil';
import addressState from 'src/state/addressState';

interface Props {
  activity: any;
}

const PaymentType: React.FC<Props> = props => {
  const { activity } = props;
  const address = useRecoilValue(addressState);

  if (activity.payer === address) {
    return <div>Sent HNT</div>;
  }

  if (activity.payee === address) {
    return <div>Received HNT</div>;
  }

  return null;
};

export default PaymentType;
