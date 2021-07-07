import React, { Suspense } from 'react';
import styled, { css } from 'styled-components';
import { FiMenu } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import pathState, { PathStateEnum } from 'src/state/pathState';
import addressState from 'src/state/addressState';
import { H4 } from 'components/Headers';
import { useAddress } from 'hooks/useAddress';
import { truncateAddress } from 'lib/utils';

const Top = styled.header`
  width: 100%;
  background-color: #272b4a;
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
          <div>
            <H4>My Wallet</H4>
            {truncateAddress(address)}
          </div>
        </Left>
        <Left
          onClick={() => updateRoute(PathStateEnum.hotspots)}
          active={path === PathStateEnum.hotspots}
        >
          <div>
            <H4>HotSpots</H4># units
          </div>
        </Left>
        <Right>
          <FiMenu size="24px" />
        </Right>
      </Top>
    </Suspense>
  );
};

export default HomeTop;
