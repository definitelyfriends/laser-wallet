import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { Logo } from 'components/svgs';
import { Button } from 'components/Buttons';
import { Purple } from 'components/Colors';
import pathState, { PathStateEnum } from 'src/state/pathState';
import { useVaultLookup } from 'hooks/useVaultLookup';
import { decryptAccount } from 'lib/vault';
import { storeItem } from 'lib/store';

const Main = styled.main`
  justify-content: space-evenly;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  color: ${Purple};
  text-align: center;
`;

const Header = styled.h1`
  font-size: 37px;
`;

const ButtonContainer = styled.div`
  width: 154px;

  button:first-child {
    margin-bottom: 10px;
  }

  button:nth-child(2) {
    color: ${Purple};
  }
`;

const WideContainer = styled.div`
  width: 300px;
  text-align: left;
`;

const WideButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;

  button:first-child {
    color: ${Purple};
    margin-right: 10px;
  }
`;

const Input = styled.input`
  border-radius: 8px;
  outline: none;
  padding: 10px;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 10px;
  flex: 1;
`;

const ErrorMessage = styled.span`
  color: red;
  text-align: right;
`;

const Flex = styled.div`
  display: flex;
`;

const Splash = () => {
  const [, setPath] = useRecoilState(pathState);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const vaults = useVaultLookup();
  const vaultsExist = vaults?.length !== 0;
  const errorExists = error.length !== 0;

  const popupIsOpen = chrome.extension.getViews({ type: 'popup' }).length !== 0;

  const openTab = () => {
    setPath(PathStateEnum.password);

    if (popupIsOpen) {
      /* @ts-ignore */
      chrome.extension.sendMessage({ action: 'openTab' });
    }
  };

  const unlockAccount = async () => {
    const canUnlock = await decryptAccount(password);

    if (canUnlock) {
      storeItem('address', vaults[0].address);
      setPath(PathStateEnum.assets);
    } else {
      setError('Invalid password');

      setTimeout(() => {
        setError('');
      }, 4000);
    }
  };

  return (
    <Main>
      <Logo width="66" height="68" />
      <div>
        <Header>Laser</Header>
        <div>Helium Wallet</div>
      </div>
      {vaultsExist ? (
        <WideContainer>
          <Flex>
            <Label>Password</Label>
            {errorExists && <ErrorMessage>{error}</ErrorMessage>}
          </Flex>
          <Input
            type="password"
            aria-invalid="false"
            dir="auto"
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === 'Return') {
                unlockAccount();
              }
            }}
            defaultValue={password}
          />
          <WideButtonContainer>
            <Button color="transparent" onClick={() => setPath(PathStateEnum.import)}>
              Import account
            </Button>
            <Button color="purple" onClick={unlockAccount}>
              Unlock
            </Button>
          </WideButtonContainer>
        </WideContainer>
      ) : (
        <ButtonContainer>
          <Button color="purple" onClick={openTab}>
            Create Account
          </Button>
        </ButtonContainer>
      )}
    </Main>
  );
};

export default Splash;
