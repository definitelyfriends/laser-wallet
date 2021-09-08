import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { Logo } from 'components/svgs';
import { Button } from 'src/components/Buttons';
import { Purple } from 'src/components/Colors';
import pathState, { PathStateEnum } from 'src/state/pathState';
import { useVaultLookup } from 'hooks/useVaultLookup';

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

const Splash = () => {
  const [, setPath] = useRecoilState(pathState);
  const vaults = useVaultLookup();

  const vaultsExist = vaults?.length !== 0;

  return (
    <Main>
      <Logo width="66" height="68" />
      <div>
        <Header>Laser</Header>
        <div>Helium Wallet</div>
      </div>
      <ButtonContainer>
        {vaultsExist ? (
          <Button color="purple" onClick={() => setPath(PathStateEnum.import)}>
            Import account
          </Button>
        ) : (
          <Button color="purple" onClick={() => setPath(PathStateEnum.password)}>
            Create Wallet
          </Button>
        )}
        <Button color="middark" onClick={() => setPath(PathStateEnum.signin)}>
          Sign in
        </Button>
      </ButtonContainer>
    </Main>
  );
};

export default Splash;
