import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
// import localForage from 'localforage';
import { FiExternalLink, FiCheck } from 'react-icons/fi';
import { Purple } from 'components/Colors';
import { Button } from 'components/Buttons';
import SettingsHeader from 'components/SettingsHeader';
import { Dark } from 'components/Colors';
import pathState, { PathStateEnum } from 'src/state/pathState';
import { fetchItem, storeItem } from 'lib/store';
import { truncateAddress } from 'lib/utils';

interface Account {
  walletName: string;
  address: string;
}

interface ListItemProps {
  selected?: boolean;
}

const ListItem = styled.li<ListItemProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  padding: 2em;
  background-color: ${props => (props.selected ? 'rgba(146, 106, 255, 0.2)' : 'inherit')};

  &:last-child {
    margin-bottom: 2em;
  }

  div:first-child {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  a {
    font-size: 14px;
  }
`;

const AddressName = styled.div`
  color: ${Purple};
  font-weight: 700;
  margin-bottom: 10px;
`;

const Selected = styled.div`
  color: ${Purple};
  font-size: 1em;
  display: flex;
  align-items: center;
`;

const Bubble = styled.div`
  background-color: ${Dark};
  width: 40px;
  height: 40px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
`;

const SwitchBubble = styled(Bubble)`
  background-color: rgba(146, 106, 255, 0.2);
`;

const ButtonContainer = styled.div`
  padding: 0 2em 1em 2em;
`;

const Settings = () => {
  const [currentAddress, setCurrentAddress] = useState('');
  const [accounts, setAccounts] = useState<[] | Account[]>([]);
  const [, setPath] = useRecoilState(pathState);

  // const logout = () => {
  //   localForage.removeItem('address');
  //   setPath(PathStateEnum.root);
  // };

  const addWallet = () => setPath(PathStateEnum.import);
  const switchWallet = (address: string) => storeItem('address', address);

  fetchItem('vaults').then(accountList => setAccounts(accountList));
  fetchItem('address').then(address => setCurrentAddress(address as any));

  return (
    <div>
      <SettingsHeader />
      <ul>
        {accounts?.map((account: Account) => {
          return (
            <ListItem selected={currentAddress === account.address}>
              <div>
                <AddressName>{account.walletName}</AddressName>
                <a
                  href={`https://explorer.helium.com/accounts/${account.address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {truncateAddress(account.address)} <FiExternalLink size="12px" />
                </a>
              </div>
              {currentAddress === account.address ? (
                <Selected>
                  Selected
                  <Bubble>
                    <FiCheck color={`${Purple}`} size="24" />
                  </Bubble>
                </Selected>
              ) : (
                <Selected onClick={() => switchWallet(account.address)}>
                  Switch
                  <SwitchBubble />
                </Selected>
              )}
            </ListItem>
          );
        })}
      </ul>
      <ButtonContainer>
        <Button onClick={addWallet} color="purple">
          Add another wallet
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default Settings;
