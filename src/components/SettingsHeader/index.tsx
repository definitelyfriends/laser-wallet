import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { FiGithub, FiX } from 'react-icons/fi';
import { Logo } from 'components/svgs';
import { Purple, Gray } from 'components/Colors';
import pathState, { PathStateEnum } from 'src/state/pathState';

const Container = styled.div`
  padding: 2em;
  display: flex;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.3em;
  flex: 1;

  span {
    display: flex;
    color: ${Purple};
    font-weight: 700;
    font-size: 1.1em;
    line-height: 13px;
  }

  div {
    color: ${Gray};
    font-size: 0.875em;
    line-height: 18px;
  }
`;

const Icon = styled.div`
  margin-left: 10px;
`;

const Bubble = styled.div`
  border-radius: 7px;
  background-color: ${Purple};
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SettingsHeader: React.FC = () => {
  const [, setPath] = useRecoilState(pathState);

  return (
    <Container>
      <Logo width="32" height="33" />
      <Text>
        <span>
          LASER v0.1
          <a
            href="https://github.com/definitelyfriends/laser-wallet"
            target="_blank"
            rel="noreferrer"
          >
            <Icon>
              <FiGithub size="15" />
            </Icon>
          </a>
        </span>
        <div>A Helium Wallet</div>
      </Text>
      <Bubble onClick={() => setPath(PathStateEnum.assets)}>
        <FiX size="25" />
      </Bubble>
    </Container>
  );
};

export default SettingsHeader;
