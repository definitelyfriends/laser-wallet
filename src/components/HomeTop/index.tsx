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

const Left = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2em;
  justify-content: flex-end;
  cursor: pointer;
`;

const Bubble = styled.div<ContainerProps>`
  background-color: ${props => (props.active ? '#916aff' : MidDark)};
  padding: 15px;
  border-radius: 7px;
  width: 100%;
`;

const Menu = styled.div`
  background-color: ${MidDark};
  padding: 15px;
  border-radius: 7px;
  margin-left: 0.875em;
`;

const Something = styled.div`
  justify-content: stretch;
  display: flex;
  flex: 1;
  padding-left: 2em;
  width: 100%;

  div ~ div {
    margin-left: 1em;
  }
`;

const Subtext = styled.div`
  font-size: 12px;
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
        <Something>
          <Left onClick={() => updateRoute(PathStateEnum.assets)}>
            <Bubble active={path === PathStateEnum.assets || path === PathStateEnum.root}>
              <H4>My Wallet</H4>
              <Subtext>{truncateAddress(address)}</Subtext>
            </Bubble>
          </Left>
          <Left onClick={() => updateRoute(PathStateEnum.hotspots)}>
            <Bubble active={path === PathStateEnum.hotspots}>
              <H4>HotSpots</H4>
              <Subtext>Coming Soon</Subtext>
            </Bubble>
          </Left>
        </Something>
        <Right>
          <Menu>
            <FiMenu size="24px" />
          </Menu>
        </Right>
      </Top>
    </Suspense>
  );
};

export default HomeTop;
