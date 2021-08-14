import React, { useState } from 'react';
import styled from 'styled-components';
import { createVault } from 'lib/vault';
import { H2 } from 'src/components/Headers';
import { useBooleanCheckboxes } from 'hooks/useBooleanCheckbox';
import { TextArea } from 'src/components/Common';
import { useRecoilState } from 'recoil';
import pathState, { PathStateEnum } from 'src/state/pathState';
import { Button } from 'src/components/Buttons';
import { Purple } from 'components/Colors';
import { storeItem } from 'lib/store';

const Container = styled.main`
  padding: 2em;
`;

const FakeTextArea = styled.input`
  border-radius: 8px;
  outline: none;
  padding: 10px;
  width: 100%;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: #cdd4e2;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const BoldH2 = styled(H2)`
  font-weight: 700;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  display: block;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const PasswordInput = styled(FakeTextArea)`
  height: 50px;
`;

const Bottom = styled.div`
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button:first-child {
    margin-right: 20px;
  }
`;

const ImportSeed: React.FC = () => {
  const [path, setPath] = useRecoilState(pathState);

  const { checked, setChecked } = useBooleanCheckboxes();
  const [seedPhrase, setSeedPhrase] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [walletName, setWalletName] = useState('');

  const importAccount = async () => {
    const created: string = await createVault({ seedPhrase, password, walletName });

    if (created) {
      storeItem('address', created);
      setPath(PathStateEnum.assets);
    }
  };

  const validatePassphrase = seedPhrase !== '';
  const verifyPasswordsMatch =
    passwordConfirm === password && password !== '' && passwordConfirm !== '';

  return (
    <Container>
      {path === PathStateEnum.import && (
        <>
          <BoldH2>Enter key phrase</BoldH2>
          <Subtitle>
            Type or paste your wallet key phrase below. Leave a space between each word.
          </Subtitle>
          <InputContainer>
            <Label>Wallet Key Phrase</Label>
            {checked ? (
              <TextArea onChange={e => setSeedPhrase(e.target.value)} defaultValue={seedPhrase} />
            ) : (
              <FakeTextArea
                aria-invalid="false"
                type="password"
                dir="auto"
                onChange={e => setSeedPhrase(e.target.value)}
                defaultValue={seedPhrase}
              />
            )}
          </InputContainer>
          <ButtonContainer>
            <Button
              color="middark"
              style={{ color: Purple }}
              onClick={() => setPath(PathStateEnum.root)}
            >
              Back
            </Button>
            <Button
              color="purple"
              onClick={() => setPath(PathStateEnum.password)}
              disabled={!validatePassphrase}
            >
              Import
            </Button>
          </ButtonContainer>
          <Bottom>
            <input
              type="checkbox"
              id="vehicle1"
              name="seed-phrase"
              checked={checked}
              onChange={e => {
                setChecked(e.target.checked);
              }}
            />
            <label htmlFor="seed-phrase">Show seed phrase</label>
          </Bottom>
        </>
      )}
      {path === PathStateEnum.password && (
        <>
          <BoldH2>Create Account</BoldH2>
          <InputContainer>
            <Label>Name your account</Label>
            <PasswordInput
              aria-invalid="false"
              type="text"
              dir="auto"
              onChange={e => setWalletName(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label>Password</Label>
            <Subtitle>
              Enter a password to unlock this Laser Wallet only. We recommend it be different than
              any other password you have.
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
            <Button onClick={importAccount} disabled={!verifyPasswordsMatch} color="purple">
              Submit
            </Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

export default ImportSeed;
