import React from 'react';
import styled from 'styled-components';
import { Logo } from 'components/svgs';
import { Button } from 'src/components/Buttons';
import { Purple } from 'src/components/Colors';
import pathState, { PathStateEnum } from 'src/state/pathState';
import { useRecoilState } from 'recoil';

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

  const updateRoute = (path: string) => setPath(path as PathStateEnum);

  return (
    <Main>
      <Logo width="66" height="68" />
      <div>
        <Header>Laser</Header>
        <div>Helium Wallet</div>
      </div>
      <ButtonContainer>
        <Button color="purple" onClick={() => updateRoute(PathStateEnum.import)}>
          Import wallet
        </Button>
        <Button color="middark" onClick={() => updateRoute(PathStateEnum.signin)}>
          Sign in
        </Button>
      </ButtonContainer>
    </Main>
  );
};

export default Splash;
