import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { createVault, watchAddress } from 'lib/vault';
import { storeItem } from 'lib/store';
import { useBooleanCheckboxes } from 'hooks/useBooleanCheckbox';
import { TextArea } from 'components/Common';
import { Button } from 'components/Buttons';
import { Purple } from 'components/Colors';
import pathState, { PathStateEnum } from 'src/state/pathState';
import {
  Container,
  FakeTextArea,
  Subtitle,
  BoldH2,
  Label,
  InputContainer,
  Bottom,
  PasswordInput,
  ButtonContainer,
} from './styles';

const ImportSeed: React.FC = () => {
  const [, setPath] = useRecoilState(pathState);

  const { checked, setChecked } = useBooleanCheckboxes();
  const [seedPhrase, setSeedPhrase] = useState('');
  const [walletName, setWalletName] = useState('');

  const isAddress = (seedPhrase: string): boolean => !seedPhrase.includes(' ');

  const importAccount = async () => {
    let created: string;

    if (isAddress(seedPhrase)) {
      created = await watchAddress({ address: seedPhrase, walletName });
    } else {
      created = await createVault({ seedPhrase, walletName });
    }

    if (created) {
      storeItem('address', created);
      setPath(PathStateEnum.assets);
    }
  };

  const validatePassphrase = seedPhrase !== '';

  return (
    <Container>
      <BoldH2>Enter key phrase or address</BoldH2>
      <Subtitle>Type or paste your wallet key phrase or public address below.</Subtitle>
      <InputContainer>
        <Label>Wallet Key Phrase or Public Address</Label>
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
      <InputContainer>
        <Label>Name your account</Label>
        <PasswordInput
          aria-invalid="false"
          type="text"
          dir="auto"
          onChange={e => setWalletName(e.target.value)}
        />
      </InputContainer>
      <ButtonContainer>
        <Button
          color="middark"
          style={{ color: Purple }}
          onClick={() => setPath(PathStateEnum.root)}
        >
          Back
        </Button>
        <Button color="purple" onClick={importAccount} disabled={!validatePassphrase}>
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
    </Container>
  );
};

export default ImportSeed;
