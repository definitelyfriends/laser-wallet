import React, { useState } from 'react';
import styled from 'styled-components';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { MidDark } from 'components/Colors';
import { useAddress } from 'hooks/useAddress';
import * as SVG from 'components/svgs';

interface Props {
  activity: any;
}

const Icon = styled.div`
  margin-left: 2em;
  margin-right: 1em;
`;

const ListItem = styled.li`
  display: flex;
  height: 80px;
  align-items: center;
  background-color: ${MidDark};
  border-radius: 7px;
  margin: 0.5em 2em;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 2em;
  flex: 1;
  justify-content: flex-end;
  flex-direction: column;
`;

const Sent = styled.div`
  color: #767991;
`;

const normalizePaymentVersions = (activity: any) => {
  return {
    ...activity,
    payee: activity.payee || activity.payments[0].payee,
    amount: activity.amount || activity.payments[0].amount,
  };
};

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

const humanizeTimestamp = (time: number): string => {
  const milliseconds = time * 1000;
  const date = new Date(milliseconds);

  return timeAgo.format(date);
};

const PaymentType: React.FC<Props> = props => {
  const [currentAddress, setCurrentAddress] = useState<string>('');
  const { payer, time, payee, amount } = normalizePaymentVersions(props.activity);

  useAddress().then(walletAddress => {
    setCurrentAddress(walletAddress as any);
  });

  const normalizedHNT = amount / 100000000;

  if (payer === currentAddress) {
    return (
      <ListItem>
        <Left>
          <Icon>
            <SVG.Logout />
          </Icon>
          <div>Sent HNT</div>
        </Left>
        <Right>
          <Sent>-{normalizedHNT} HNT</Sent>
          <div>{humanizeTimestamp(time)}</div>
        </Right>
      </ListItem>
    );
  }

  if (payee === currentAddress) {
    return (
      <ListItem>
        <Left>
          <Icon>
            <SVG.Login />
          </Icon>
          <div>
            <div>Received HNT</div>
            <div>Confirmed</div>
          </div>
        </Left>
        <Right>
          <Sent>{normalizedHNT} HNT</Sent>
          <div>{humanizeTimestamp(time)}</div>
        </Right>
      </ListItem>
    );
  }

  return null;
};

export default PaymentType;
