import React, { Suspense, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useIdleTimer } from 'react-idle-timer';
import pathState, { PathStateEnum } from 'src/state/pathState';
import HomeTop from 'components/HomeTop';
import { useStored } from 'hooks/useStored';
import localforage from 'localforage';
import CryptoES from 'crypto-es';
import { clearCurrentAccount } from 'lib/store';

declare global {
  interface Window {
    Buffer: any;
    localforage: any;
    CryptoES: any;
  }
}

// TODO: remove
window.localforage = localforage;
window.CryptoES = CryptoES;

const Splash = React.lazy(() => import('containers/Splash'));
const Assets = React.lazy(() => import('components/Assets'));
const History = React.lazy(() => import('components/History'));
const Settings = React.lazy(() => import('containers/Settings'));
const ImportSeed = React.lazy(() => import('containers/Onboarding/ImportSeed'));
const Password = React.lazy(() => import('containers/Onboarding/Password'));
const SignIn = React.lazy(() => import('containers/SignIn'));
const Receive = React.lazy(() => import('containers/Receive'));

const FIFTEEN_MINUTES = 900000;

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [path, setPath] = useRecoilState(pathState);

  useStored().then(setLoggedIn);

  const handleOnIdle = () => {
    const popupIsOpen = chrome.extension.getViews({ type: 'popup' }).length !== 0;

    if (popupIsOpen) {
      console.log(getLastActiveTime);
    } else {
      setPath(PathStateEnum.root);
      clearCurrentAccount();
    }
  };

  const { getLastActiveTime } = useIdleTimer({
    timeout: FIFTEEN_MINUTES,
    onIdle: handleOnIdle,
    debounce: 500,
    startOnMount: true,
  });

  if (path === PathStateEnum.root && !loggedIn) {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <Splash />
      </Suspense>
    );
  }

  if (path === PathStateEnum.import) {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <ImportSeed />
      </Suspense>
    );
  }

  if (path === PathStateEnum.password) {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <Password />
      </Suspense>
    );
  }

  if (path === PathStateEnum.signin) {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <SignIn />
      </Suspense>
    );
  }

  if (path === PathStateEnum.receive) {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <Receive />
      </Suspense>
    );
  }

  if (path === PathStateEnum.history) {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <History />
      </Suspense>
    );
  }

  if (path === PathStateEnum.settings) {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <Settings />
      </Suspense>
    );
  }

  if (path === PathStateEnum.assets || loggedIn) {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <HomeTop />
        <Assets />
      </Suspense>
    );
  }

  return <Splash />;
};

export default Home;
