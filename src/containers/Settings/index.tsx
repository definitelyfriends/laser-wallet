import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import localForage from 'localforage';
import { FiExternalLink } from 'react-icons/fi';
import { Purple } from 'components/Colors';
import { Button } from 'components/Buttons';
import SettingsHeader from 'components/SettingsHeader';
import pathState, { PathStateEnum } from 'src/state/pathState';
import { fetchItem } from 'lib/store';
import { truncateAddress } from 'lib/utils';

interface Account {
  walletName: string;
  address: string;
}

interface ListItemProps {
  selected?: boolean;
}

const Container = styled.div`
  margin: 0 2em 1em 2em;
`;

const ListItem = styled.li<ListItemProps>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 80px;
  padding: 20px;
  background-color: ${props => (props.selected ? 'rgba(146, 106, 255, 0.2)' : 'inherit')};

  a {
    font-size: 14px;
  }
`;

const AddressName = styled.div`
  color: ${Purple};
  font-weight: 700;
  margin-bottom: 10px;
`;

const Settings = () => {
  const [currentAddress, setCurrentAddress] = useState('');
  const [accounts, setAccounts] = useState<[] | Account[]>([]);
  const [, setPath] = useRecoilState(pathState);

  const logout = () => {
    localForage.removeItem('address');
    setPath(PathStateEnum.root);
  };

  fetchItem('vaults').then(accountList => setAccounts(accountList));
  fetchItem('address').then(address => setCurrentAddress(address as any));

  return (
    <Container>
      <SettingsHeader />
      <ul>
        {accounts?.map((account: Account) => {
          return (
            <ListItem selected={currentAddress === account.address}>
              <AddressName>{account.walletName}</AddressName>
              <a
                href={`https://explorer.helium.com/accounts/${currentAddress}`}
                target="_blank"
                rel="noreferrer"
              >
                {truncateAddress(currentAddress)} <FiExternalLink size="12px" />
              </a>
            </ListItem>
          );
        })}
      </ul>
      <Button onClick={logout} color="purple">
        Log out
      </Button>
    </Container>
  );
};

export default Settings;
