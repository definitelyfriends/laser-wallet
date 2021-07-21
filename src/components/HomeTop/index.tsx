import React, { Suspense } from 'react';
import styled from 'styled-components';
import { FiMenu, FiExternalLink, FiChevronDown } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { MidDark } from 'components/Colors';
import pathState, { PathStateEnum } from 'src/state/pathState';
import addressState from 'src/state/addressState';
import { H4 } from 'components/Headers';
import { useAddress } from 'hooks/useAddress';
import { truncateAddress } from 'lib/utils';
import { useState } from 'react';

const Top = styled.header`
  width: 100%;
  background-color: #1f2436;
  color: #ffffff;
  height: 83px;
  display: flex;
  padding-left: 2em;
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
  padding: 11px;
  border-radius: 7px;
  width: 100%;
  display: flex;

  div:first-child {
    flex: 1;
  }
`;

const Menu = styled.div`
  background-color: ${MidDark};
  padding: 15px;
  border-radius: 7px;
  margin-left: 0.875em;
`;

const Subtext = styled.div`
  font-size: 12px;
  margin-top: 5px;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Chevron = styled.div`
  display: flex;
  align-items: center;
`;

const HomeTop: React.FC = () => {
  const [address, setAddress] = useRecoilState<string>(addressState);
  const [, setPath] = useRecoilState(pathState);
  const [toggleWalletDropdown, setToggleWalletDropdown] = useState(false);

  const updateRoute = (path: string) => setPath(path as PathStateEnum);

  useAddress().then(walletAddress => {
    setAddress(walletAddress as string);
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Top>
        <Left>
          <Bubble>
            <div>
              <H4>My Wallet</H4>
              <Subtext>
                <a
                  href={`https://explorer.helium.com/accounts/${address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {truncateAddress(address)} <FiExternalLink size="12px" />
                </a>
              </Subtext>
            </div>
            <Chevron>
              <FiChevronDown size="24px" />
            </Chevron>
          </Bubble>
        </Left>

        <Right>
          <Menu onClick={() => updateRoute(PathStateEnum.settings)}>
            <FiMenu size="24px" />
          </Menu>
        </Right>
      </Top>
    </Suspense>
  );
};

export default HomeTop;
