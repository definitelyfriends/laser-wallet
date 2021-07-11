import React, { Suspense } from 'react';
import styled, { css } from 'styled-components';
import { FiMenu } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { MidDark } from 'components/Colors';
import pathState, { PathStateEnum } from 'src/state/pathState';
import addressState from 'src/state/addressState';
import { H4 } from 'components/Headers';
import { useAddress } from 'hooks/useAddress';
import { truncateAddress } from 'lib/utils';

const Top = styled.header`
  width: 100%;
  background-color: #1f2436;
  color: #ffffff;
  height: 83px;
  display: flex;
`;

interface ContainerProps {
  active?: boolean;
}

const Left = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  margin-left: 2em;
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      border-bottom: 1px solid white;
    `}
`;

const Right = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  margin-right: 2em;
  flex: 1;
  justify-content: flex-end;
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      border-bottom: 1px solid white;
    `}
`;

const Bubble = styled.div<ContainerProps>`
  background-color: ${props => (props.active ? '#916aff' : MidDark)};
  padding: 15px;
  border-radius: 7px;
`;

const HomeTop: React.FC = () => {
  const [address, setAddress] = useRecoilState<string>(addressState);
  const [path, setPath] = useRecoilState(pathState);

  const updateRoute = (path: string) => setPath(path as PathStateEnum);

  useAddress().then(walletAddress => {
    setAddress(walletAddress as string);
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Top>
        <Left
          onClick={() => updateRoute(PathStateEnum.assets)}
          active={path === PathStateEnum.assets}
        >
          <Bubble active={path === PathStateEnum.assets || path === PathStateEnum.root}>
            <H4>My Wallet</H4>
            {truncateAddress(address)}
          </Bubble>
        </Left>
        <Left
          onClick={() => updateRoute(PathStateEnum.hotspots)}
          active={path === PathStateEnum.hotspots}
        >
          <Bubble active={path === PathStateEnum.hotspots}>
            <H4>HotSpots</H4>
            Coming Soon
          </Bubble>
        </Left>
        <Right>
          <FiMenu size="24px" />
        </Right>
      </Top>
    </Suspense>
  );
};

export default HomeTop;
