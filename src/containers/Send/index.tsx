// TODO: make a lot of these components shared
// i.e. back button, inputs
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { MidDark, MidGray } from 'components/Colors';
import { H2 } from 'components/Headers';
import { Button } from 'components/Buttons';
import { FiChevronLeft } from 'react-icons/fi';
import pathState, { PathStateEnum } from 'src/state/pathState';
import { Label, InputContainer, PasswordInput } from 'containers/Onboarding/styles';

const Container = styled.div`
  padding: 2em 2em 1em 2em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.8em 0;

  button:first-child {
    margin-right: 20px;
  }
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

const BodyContainer = styled.div`
  padding: 0 2em 1em 2em;
`;

const Title = styled.div`
  margin-left: 10px;
  margin-bottom: 30px;

  div:last-child {
    color: ${MidGray};
  }
`;

const StyledH2 = styled(H2)`
  font-weight: 700;
  margin-bottom: 15px;
  margin-top: 20px;
`;

const TransferFee = styled.div`
  flex: 1;
  display: flex;
`;

// type Transaction = {
//   amount: number;
//   to: string;
//   memo?: string;
// }

const Send: React.FC = () => {
  const [, setPath] = useRecoilState(pathState);
  const [review, setReview] = useState<boolean>(false);
  const [transaction, setTransaction] = useState({
    to: '',
    memo: '',
    amount: 0,
  });

  const verifyCanReview = transaction.to !== '' && transaction.amount !== 0;

  return (
    <>
      {review ? (
        <>
          <div>Confirm send to {transaction.to}</div>
          <div>Memo {transaction.memo}</div>
          <div>Amount {transaction.amount}</div>
          <div>HNT Transfer Fee $0.01</div>
          <div>Total {transaction.amount + 0.01}</div>
        </>
      ) : (
        <>
          <Container>
            <Bubble onClick={() => setPath(PathStateEnum.assets)}>
              <FiChevronLeft size="25" />
            </Bubble>
          </Container>
          <BodyContainer>
            <Title>
              <StyledH2>Send HNT</StyledH2>
              <div>Please don't fuck up</div>
            </Title>
            <InputContainer>
              <Label>Send To</Label>
              <PasswordInput
                aria-invalid="false"
                type="text"
                dir="auto"
                onChange={e =>
                  setTransaction(prevState => ({
                    ...prevState,
                    to: e.target.value,
                  }))
                }
              />
            </InputContainer>
            <InputContainer>
              <Label>Amount</Label>
              <PasswordInput
                aria-invalid="false"
                type="text"
                dir="auto"
                onChange={e =>
                  setTransaction(prevState => ({
                    ...prevState,
                    amount: Number(e.target.value),
                  }))
                }
              />
            </InputContainer>
            <InputContainer>
              <Label>Memo</Label>
              <PasswordInput
                aria-invalid="false"
                type="text"
                dir="auto"
                onChange={e =>
                  setTransaction(prevState => ({
                    ...prevState,
                    memo: e.target.value,
                  }))
                }
              />
            </InputContainer>
            <TransferFee>
              <div>HNT transfer fee</div>
              <div>some amount in DC here</div>
            </TransferFee>
            <ButtonContainer>
              <Button color="middark" onClick={() => setPath(PathStateEnum.assets)}>
                Cancel
              </Button>
              <Button
                color="purple"
                onClick={() => {
                  if (verifyCanReview) {
                    setReview(true);
                  }
                }}
              >
                Review
              </Button>
            </ButtonContainer>
          </BodyContainer>
        </>
      )}
    </>
  );
};

export default Send;
