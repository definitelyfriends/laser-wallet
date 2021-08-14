import React, { Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';
import pathState, { PathStateEnum } from 'src/state/pathState';
import HomeTop from 'components/HomeTop';
import { useStored } from 'hooks/useStored';
import localforage from 'localforage';

declare global {
  interface Window {
    Buffer: any;
    localforage: any;
  }
}

window.localforage = localforage;

const Splash = React.lazy(() => import('containers/Splash'));
const Assets = React.lazy(() => import('components/Assets'));
const History = React.lazy(() => import('components/History'));
const Settings = React.lazy(() => import('containers/Settings'));
const ImportSeed = React.lazy(() => import('containers/ImportSeed'));
const SignIn = React.lazy(() => import('containers/SignIn'));
const Receive = React.lazy(() => import('containers/Receive'));

const Home = () => {
  const path = useRecoilValue(pathState);
  const [loggedIn, setLoggedIn] = useState(false);

  useStored().then(setLoggedIn);

  if (path === PathStateEnum.root && !loggedIn) {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <Splash />
      </Suspense>
    );
  }

  if (path === PathStateEnum.import || path === PathStateEnum.password) {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <ImportSeed />
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
