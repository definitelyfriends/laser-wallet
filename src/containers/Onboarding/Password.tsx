import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { createAccount } from 'lib/vault';
import { Button } from 'components/Buttons';
import { Purple } from 'components/Colors';
import pathState, { PathStateEnum } from 'src/state/pathState';
import {
  Container,
  Subtitle,
  BoldH2,
  Label,
  InputContainer,
  PasswordInput,
  ButtonContainer,
} from './styles';

const Password: React.FC = () => {
  const [, setPath] = useRecoilState(pathState);

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const verifyPasswordsMatch =
    passwordConfirm === password && password !== '' && passwordConfirm !== '';

  const createAndRedirect = async () => {
    const created = await createAccount(password);

    if (created) {
      setPath(PathStateEnum.import);
    }
  };

  return (
    <Container>
      <BoldH2>Create Account</BoldH2>
      <InputContainer>
        <Label>Password</Label>
        <Subtitle>
          Enter a password to unlock this Laser Wallet only. We recommend it be different than any
          other password you have.
        </Subtitle>
        <PasswordInput
          aria-invalid="false"
          type="password"
          dir="auto"
          onChange={e => setPassword(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Label>Confirm Password</Label>
        <PasswordInput
          aria-invalid="false"
          type="password"
          dir="auto"
          onChange={e => setPasswordConfirm(e.target.value)}
        />
      </InputContainer>
      <ButtonContainer>
        <Button
          color="middark"
          style={{ color: Purple }}
          onClick={() => setPath(PathStateEnum.import)}
        >
          Back
        </Button>
        <Button onClick={createAndRedirect} disabled={!verifyPasswordsMatch} color="purple">
          Submit
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Password;
