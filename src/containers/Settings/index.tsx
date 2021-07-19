import React from 'react';
import { useRecoilState } from 'recoil';
import { Button } from 'src/components/Buttons';
import { clearItems } from 'lib/store';
import pathState, { PathStateEnum } from 'src/state/pathState';
import addressState from 'src/state/addressState';

const Settings = () => {
  const [, setAddress] = useRecoilState<string>(addressState);
  const [, setPath] = useRecoilState(pathState);

  const logout = () => {
    clearItems();
    setAddress('');
    setPath(PathStateEnum.root);
  };

  return (
    <div>
      Settings Page
      <Button onClick={logout} color="purple">
        Log out
      </Button>
    </div>
  );
};

export default Settings;
