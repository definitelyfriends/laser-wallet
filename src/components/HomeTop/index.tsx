import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import { FiMenu, FiPlus, FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { MidDark, DarkPurple } from 'components/Colors';
import pathState, { PathStateEnum } from 'src/state/pathState';
import { H4 } from 'components/Headers';
import { useAddress } from 'hooks/useAddress';
import { truncateAddress } from 'lib/utils';
import { fetchItem } from 'lib/store';

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
  position: relative;
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
  margin-top: 3px;

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

const PlusIcon = styled(FiPlus)``;

const WalletDropdown = styled.div`
  background-color: ${DarkPurple};
  padding: 11px;
  border-radius: 7px;
  width: 100%;
  display: flex;
  position: absolute;
  top: 80px;
  left: 0;
  height: 48px;
  align-items: center;
  flex: 1;

  div:first-child {
    flex: 1;
  }
`;

const HomeTop: React.FC = () => {
  const [, setPath] = useRecoilState(pathState);

  const [toggleWalletDropdown, setToggleWalletDropdown] = useState(false);
  const [name, setName] = useState(null);
  const [currentAddress, setCurrentAddress] = useState<string>('');

  const updateRoute = (path: string) => setPath(path as PathStateEnum);

  useAddress().then(walletAddress => {
    setCurrentAddress(walletAddress as any);
  });

  fetchItem('vaults').then(vts => {
    const current = vts.find(item => item['address'] === currentAddress);
    /* @ts-ignore */
    const name = current?.walletName;

    if (name) {
      setName(name);
    }
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Top>
        <Left>
          <Bubble
            onClick={() => setToggleWalletDropdown(!toggleWalletDropdown)}
            active={toggleWalletDropdown}
          >
            <div>
              <H4>{name || 'My Wallet'}</H4>
              <Subtext>
                <a
                  href={`https://explorer.helium.com/accounts/${currentAddress}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {truncateAddress(currentAddress)} <FiExternalLink size="12px" />
                </a>
              </Subtext>
            </div>
            <Chevron>
              {toggleWalletDropdown ? <FiChevronUp size="24px" /> : <FiChevronDown size="24px" />}
            </Chevron>
          </Bubble>
          {toggleWalletDropdown && (
            <WalletDropdown onClick={() => updateRoute(PathStateEnum.import)}>
              <div>Add another wallet</div> <PlusIcon />
            </WalletDropdown>
          )}
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
