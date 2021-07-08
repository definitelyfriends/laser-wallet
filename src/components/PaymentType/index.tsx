import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import addressState from 'src/state/addressState';

interface Props {
  activity: any;
}

const Circle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 100px;
  background-color: ${props => props.color};
  margin-left: 2em;
  margin-right: 1em;
`;

const ListItem = styled.li`
  display: flex;
  height: 80px;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #e4e3ff;
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
  const address = useRecoilValue(addressState);
  const { payer, time, payee, amount } = normalizePaymentVersions(props.activity);
  const normalizedHNT = amount / 100000000;

  if (payer === address) {
    return (
      <ListItem>
        <Left>
          <Circle color="blue" />
          <div>Sent HNT</div>
        </Left>
        <Right>
          <Sent>-{normalizedHNT} HNT</Sent>
          <div>{humanizeTimestamp(time)}</div>
        </Right>
      </ListItem>
    );
  }

  if (payee === address) {
    return (
      <ListItem>
        <Left>
          <Circle color="green" />
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
