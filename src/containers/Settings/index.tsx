import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from 'src/components/Buttons';
import pathState, { PathStateEnum } from 'src/state/pathState';
import { fetchItem } from 'lib/store';

interface Account {
  walletName: string;
  address: string;
}

const Settings = () => {
  const [, setAddress] = useState('');
  const [accounts, setAccounts] = useState<[] | Account[]>([]);
  const [, setPath] = useRecoilState(pathState);

  const logout = () => {
    setAddress('');
    setPath(PathStateEnum.root);
  };

  fetchItem('vaults').then(accountList => setAccounts(accountList));

  return (
    <div>
      Settings Page
      <ul>
        {accounts?.map((account: Account) => {
          return (
            <li>
              {account.walletName}: {account.address}
            </li>
          );
        })}
      </ul>
      <Button onClick={logout} color="purple">
        Log out
      </Button>
    </div>
  );
};

export default Settings;
